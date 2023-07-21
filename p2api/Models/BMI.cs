namespace p2api.Models;

public class BMI
{
    public long id { get; set; }
    public double weight { get; set; } // kg
    public double height { get; set; } // cm
    public double BMIScore
    {
        get { return weight / Math.Pow(height, 2); } // calculates BMI
    }
    public long userId { get; set; }
    public User? user { get; set; } // property for navigation
    public DateTime CreateAt {get; set; } = DateTime.UtcNow; // this gives a timestamp 
}


