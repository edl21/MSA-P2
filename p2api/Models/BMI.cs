namespace p2api.Models;

public class BMI
{
    public long id { get; set; }
    public double weight { get; set; } // kg
    public double height { get; set; } // cm
    public double tdee { get; set; } // TDEE
    public double BMIScore
    {
        get { return weight / Math.Pow(height / 100, 2); } // calculates BMI
    }
    public string username { get; set; } // Username for the associated user
    public DateTime CreateAt { get; set; } = DateTime.UtcNow; // this gives a timestamp
}
