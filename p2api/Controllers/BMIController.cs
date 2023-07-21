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
        public async Task<ActionResult<IEnumerable<BMI>>> GetBMIs()
        {
          if (_context.BMIs == null)
          {
              return NotFound();
          }
            return await _context.BMIs.ToListAsync();
        }

        // GET: api/BMI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BMI>> GetBMI(long id)
        {
          if (_context.BMIs == null)
          {
              return NotFound();
          }
            var bMI = await _context.BMIs.FindAsync(id);

            if (bMI == null)
            {
                return NotFound();
            }

            return bMI;
        }

        // PUT: api/BMI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBMI(long id, BMI bMI)
        {
            if (id != bMI.id)
            {
                return BadRequest();
            }

            _context.Entry(bMI).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BMIExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BMI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BMI>> PostBMI(BMI bMI)
        {
          if (_context.BMIs == null)
          {
              return Problem("Entity set 'BMIContext.BMIs'  is null.");
          }
            _context.BMIs.Add(bMI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBMI", new { id = bMI.id }, bMI);
        }

        // DELETE: api/BMI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBMI(long id)
        {
            if (_context.BMIs == null)
            {
                return NotFound();
            }
            var bMI = await _context.BMIs.FindAsync(id);
            if (bMI == null)
            {
                return NotFound();
            }

            _context.BMIs.Remove(bMI);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BMIExists(long id)
        {
            return (_context.BMIs?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
