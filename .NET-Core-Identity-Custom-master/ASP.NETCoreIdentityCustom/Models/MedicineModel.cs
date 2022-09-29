using System.ComponentModel.DataAnnotations;

namespace ASP.NETCoreIdentityCustom.Models
{
    public class MedicineModel
    {
        [Key]
        public int M_Id { get; set; }

        [Required]
        public string? M_Name { get; set; }

        [Required]
        public string? M_Manufacturer { get; set; }

        [Required]
        public int M_Price { get; set; }

        [Required]
        public string? M_Exp_Date { get; set; }

        [Required]
        public int M_Stock { get; set; }


        public void setM_Id(int M_Id)
        {
            this.M_Id = M_Id;
        }
        public void getM_Id(int M_Id)
        {
            this.M_Id = M_Id;
        }

        public void setM_Name(string M_Name)
        {
            this.M_Name = M_Name;
        }
        public void getM_Name(string M_Name)
        {
            this.M_Name = M_Name;
        }

        public void setM_Manufacturer(string M_Manufacturer)
        {
            this.M_Manufacturer = M_Manufacturer;
        }
        public void getM_Manufacturer(string M_Manufacturer)
        {
            this.M_Manufacturer = M_Manufacturer;
        }

        public void setM_Price(int M_Price)
        {
            this.M_Price = M_Price;
        }
        public void getM_Price(int M_Price)
        {
            this.M_Price = M_Price;
        }

        public void setM_Exp_Date(string M_Exp_Date)
        {
            this.M_Exp_Date = M_Exp_Date;
        }
        public void getM_Exp_Date(string M_Exp_Date)
        {
            this.M_Exp_Date = M_Exp_Date;
        }

        public void setM_Stock(int M_Stock)
        {
            this.M_Stock = M_Stock;
        }
        public void getM_Stock(int M_Stock)
        {
            this.M_Stock = M_Stock;
        }
    }
}
