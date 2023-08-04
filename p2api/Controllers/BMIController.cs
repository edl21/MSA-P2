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
        private readonly BMIContext _context;

        public BMIController(BMIContext context)
        {
            _context = context;
        }

        // POST: api/BMI
        [HttpPost]
        public async Task<IActionResult> PostBMI([FromBody] BMI model)
        {
            if (ModelState.IsValid)
            {
                // Look up the user by username, using case-insensitive comparison
                var user = _context.Users
                            .FirstOrDefault(u => u.Username.Equals(model.Username, StringComparison.OrdinalIgnoreCase));

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
