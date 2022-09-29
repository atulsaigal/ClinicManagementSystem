using ASP.NETCoreIdentityCustom.Data;
using ASP.NETCoreIdentityCustom.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreIdentityCustom.Controllers
{
    public class MedicineController : Controller
    {
        MedicineDBAccess MDBA = new MedicineDBAccess();

        public IActionResult MedicineManagement()
        {
            return View();
        }

        public IActionResult AddMedicine()
        {
            return View();

        }

        [HttpPost]
        public JsonResult AddMedicine([FromBody] MedicineModel model)
        {
            MDBA.AddMedicine(model);
            return Json(View(model));
        }

        [HttpPost]
        public JsonResult UpdateMedicine([FromBody] MedicineModel model)
        {
            MDBA.UpdateMedicine(model);
            return Json(View(model));
        }

        [HttpGet]
        public JsonResult MedicineManage(string orderby, string whereclause)
        {
            List<MedicineModel> ULst = new List<MedicineModel>();
            ULst = MDBA.GetMedicineData(orderby, whereclause);
            return Json(new { data = ULst });
        }

        [HttpPost]
        public JsonResult DeleteMedicine([FromBody] MedicineModel UM)
        {
            MDBA.DeleteRecord(UM);
            return Json(new { data = UM });
        }
    }
}
