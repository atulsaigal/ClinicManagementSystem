using ASP.NETCoreIdentityCustom.Data;
using ASP.NETCoreIdentityCustom.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreIdentityCustom.Controllers
{
    public class UserManagement : Controller
    {

        DBAccessLayer UD = new DBAccessLayer();

        //private readonly ApplicationDbContext _context;
        //public UserManagement(ApplicationDbContext context)
        //{
        //    _context = context;
        //}

        //public IActionResult UserManagementView()
        //{
        //    IEnumerable<UserManagementModel> objCatlist = _context.UserManagement;
        //    return View(objCatlist);
        //}

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Registration()
        {
            return View();
        }
        public IActionResult UserManagementView()
        {
            return View();
        }



        [HttpPost]
        public JsonResult AddUser([FromBody] UserManagementModel model)
        {
            if (ModelState.IsValid)
            {
                UD.AddData(model);
            }
            return Json(View(model));
        }

        public JsonResult GetAllUserData(string OrderBy, string WhereClause)
        {
            List<UserManagementModel> ULst = new List<UserManagementModel>();

            ULst = UD.GetUserData(OrderBy, WhereClause);

            return Json(new { data = ULst });

        }

        [HttpPost]
        public JsonResult UpdateUserStatus([FromBody] UserManagementModel UM)
        {
            UD.UpdateUserStatus(UM);
            return Json(new { data = UM });

        }

        [HttpPost]
        public JsonResult UpdateRecord([FromBody] UserManagementModel model)
        {
            UD.UpdateData(model);
            return Json(View(model));
        }

    }
}
