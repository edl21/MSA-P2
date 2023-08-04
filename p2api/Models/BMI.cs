namespace p2api.Models;
public class BMI
{
    public long Id { get; set; }
    public double Weight { get; set; }
    public double Height { get; set; }
    public double BMIScore { get; set; }
    public int TDEE { get; set; }
    public string? Username { get; set; }
}
