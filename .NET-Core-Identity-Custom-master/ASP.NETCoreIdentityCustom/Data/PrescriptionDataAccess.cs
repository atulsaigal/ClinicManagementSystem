using ASP.NETCoreIdentityCustom.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ASP.NETCoreIdentityCustom.Data
{
    public class PrescriptionDataAccess
    {

        string connectionString = "Server=192.168.1.250\\SQL2019INT; Database=CMS_42; User Id=uttam; Password=uttam; Trusted_Connection=false; MultipleActiveResultSets=true";

        SqlConnection con = null;
        SqlCommand cmd = null;


        public PrescriptionDataAccess()
        {
            con = new SqlConnection(connectionString);
            con.Open();
        }

        public void AddPprescription(PrescriptionModel model)
        {
            using (con)
            {
                SqlCommand cmd = new SqlCommand("AddPrescription", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PatientId", model.PatientId);
                cmd.Parameters.AddWithValue("@CreatedAt", SqlDbType.VarChar).Value = DateTime.Now.ToString("dd/MM/yyyy");
                cmd.Parameters.AddWithValue("@MedicineName", model.MedicineName);
                cmd.Parameters.AddWithValue("@SoldQuantity", model.Quantity);
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
    }
}
