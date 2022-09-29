using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASP.NETCoreIdentityCustom.Models
{
    public class PrescriptionModel
    {

        [ForeignKey("PatientModel")]
        public int PatientId { get; set; }
        [Required]
        public string? CreatedAt { get; set; }
        [Required]
        public string? MedicineName { get; set; }
        [Required]
        public int? Quantity { get; set; }

    }
}
