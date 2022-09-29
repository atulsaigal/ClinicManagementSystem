using ASP.NETCoreIdentityCustom.Data;
using ASP.NETCoreIdentityCustom.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreIdentityCustom.Controllers
{
    public class PrescriptionController : Controller
    {
        PrescriptionDataAccess PDA = new PrescriptionDataAccess();

        public IActionResult AddPrescription()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddPrescription([FromBody] PrescriptionModel model)
        {
            {
                PDA.AddPprescription(model);

            }
            return Json(View(model));
        }
    }
}
