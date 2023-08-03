using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        // GET: api/BMI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BMI>>> GetBMIs(string username)
        {
            return await _context.BMIs.Where(b => b.username == username).ToListAsync();
        }

        // GET: api/BMI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BMI>> GetBMI(long id)
        {
            var bMI = await _context.BMIs.FindAsync(id);
            if (bMI == null)
            {
                return NotFound();
            }

            return bMI;
        }

        // POST: api/BMI
        [HttpPost]
        public async Task<ActionResult<BMI>> PostBMI(BMI bMI)
        {
            _context.BMIs.Add(bMI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBMI", new { id = bMI.id }, bMI);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBMI([FromBody] BMI model)
        {
            if (ModelState.IsValid)
            {
                // You can look up the user by username if needed
                var user = _context.Users.FirstOrDefault(u => u.Username == model.username);
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


        // DELETE: api/BMI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBMI(long id)
        {
            var bMI = await _context.BMIs.FindAsync(id);
            if (bMI == null)
            {
                return NotFound();
            }

            _context.BMIs.Remove(bMI);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
