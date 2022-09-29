using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ASP.NETCoreIdentityCustom.Controllers
{
    public class ReportController : Controller
    {
        string connectionString = "Server=192.168.1.250\\SQL2019INT; Database=CMS_42; User Id=uttam; Password=uttam; Trusted_Connection=false; MultipleActiveResultSets=true";

        SqlConnection con = null;
        SqlCommand cmd = null;

        //ReportDBAccess RDBA = new ReportDBAccess();

        public IActionResult PrescriptionReport()
        {
            return View();
        }

        [HttpPost]
        public IActionResult PrescriptionReport(string startDate, string endDate)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("GetReport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                {
                    cmd.Parameters.AddWithValue("@From", Convert.ToString(startDate));
                    cmd.Parameters.AddWithValue("@To", Convert.ToString(endDate));
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    ViewBag.Data = dt;
                }

            }
            return View();
        }

    }
}
