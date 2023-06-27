namespace API.Extensions
{
    // * This class is used to extend other classes
    public static class DateTimeExtensions
    {
        // * Extend the DateOnly class to calculate age
        public static int CalculateAge(this DateOnly dob)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var age = today.Year - dob.Year;
            if (dob > today.AddYears(-age))
            {
                age--;
            }

            return age;
        }
    }
}
