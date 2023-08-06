using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using p2api.Models;

namespace p2api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BMIController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BMIController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/BMI
        [HttpPost]
        public async Task<IActionResult> PostBMI([FromBody] BMI model)
        {
            if (ModelState.IsValid)
            {
                // can look up the user by username if needed
                var user = _context.Users.FirstOrDefault(u => u.Username == model.Username);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                // Convert height from cm to meters
                double heightInMeters = model.Height / 100;
                // Calculate BMI score
                model.BMIScore = model.Weight / (heightInMeters * heightInMeters);

                _context.BMIs.Add(model);
                await _context.SaveChangesAsync();

                return Ok("BMI data saved successfully");
            }

            return BadRequest(ModelState);
        }

        // GET: api/BMI
        [HttpGet]
        public async Task<IActionResult> GetBMIHistory()
        {
            var bmiHistory = await _context.BMIs.ToListAsync();
            return Ok(bmiHistory);
        }
        [HttpGet("username/{username}")]
        public async Task<IActionResult> GetBMIByUsername(string username)
        {
            // Finding the user by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var bmiData = await _context.BMIs.Where(b => b.Username == username).ToListAsync();

            return Ok(bmiData);
        }

    }
}
