using Microsoft.EntityFrameworkCore;
using p2api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("AppData"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Redirect HTTP to HTTPS
app.UseHttpsRedirection();

// Serve static files
app.UseStaticFiles();  // <--- Add this line

// Use routing
app.UseRouting();

// Use authorization
app.UseAuthorization();

// Enable Swagger in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Map the controllers
app.MapControllers();

app.Run();
