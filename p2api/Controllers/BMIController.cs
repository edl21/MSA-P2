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
                // You can look up the user by username if needed
                var user = _context.Users.FirstOrDefault(u => u.Username == model.Username);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                _context.BMIs.Add(model);
                await _context.SaveChangesAsync();

                return Ok("BMI data saved successfully");
            }

            return BadRequest(ModelState);
        }
    }
}
