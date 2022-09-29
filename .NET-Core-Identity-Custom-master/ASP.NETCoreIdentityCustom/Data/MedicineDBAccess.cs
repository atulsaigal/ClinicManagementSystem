using ASP.NETCoreIdentityCustom.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ASP.NETCoreIdentityCustom.Data
{
    public class MedicineDBAccess
    {

        string connectionString = "Server=192.168.1.250\\SQL2019INT; Database=CMS_42; User Id=uttam; Password=uttam; Trusted_Connection=false; MultipleActiveResultSets=true";

        SqlConnection con = null;
        SqlCommand cmd = null;
        public MedicineDBAccess()
        {
            con = new SqlConnection(connectionString);
            con.Open();

        }

        public int AddMedicine(MedicineModel model)
        {
            if (model.M_Id == 0)
            {
                using (con)
                {
                    SqlCommand cmd = new SqlCommand("AddMedicine", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@M_Name", model.M_Name);
                    cmd.Parameters.AddWithValue("@M_Manufacturer", model.M_Manufacturer);
                    cmd.Parameters.AddWithValue("@M_Price", model.M_Price);
                    cmd.Parameters.AddWithValue("@M_Exp_Date", model.M_Exp_Date);
                    cmd.Parameters.AddWithValue("@M_Stock", model.M_Stock);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return 1;
        }

        public int UpdateMedicine(MedicineModel model)
        {

            using (con)
            {
                cmd = new SqlCommand("UpdateMedicine_SP", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MID", model.M_Id);
                cmd.Parameters.AddWithValue("@M_Name", model.M_Name);
                cmd.Parameters.AddWithValue("@M_Manufacturer", model.M_Manufacturer);
                cmd.Parameters.AddWithValue("@M_Price", model.M_Price);
                cmd.Parameters.AddWithValue("@M_Exp_Date", model.M_Exp_Date);
                cmd.Parameters.AddWithValue("@M_Stock", model.M_Stock);

                cmd.ExecuteNonQuery();
                con.Close();
            }
            return 1;
        }


        public List<MedicineModel> GetMedicineData(string orderby, string whereclause)
        {
            List<MedicineModel> ULst = new List<MedicineModel>();
            using (con)
            {
                cmd = new SqlCommand("GetMedicineRecords", con);
                cmd.Parameters.AddWithValue("@orderby", SqlDbType.VarChar).Value = orderby;
                cmd.Parameters.AddWithValue("@whereclause", SqlDbType.VarChar).Value = whereclause;
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    MedicineModel U = new MedicineModel();
                    U.M_Id = Convert.ToInt32(rdr["MID"]);
                    U.M_Name = rdr["M_Name"].ToString();
                    U.M_Manufacturer = rdr["M_Manufacturer"].ToString();
                    U.M_Price = Convert.ToInt32(rdr["M_Price"]);
                    U.M_Exp_Date = rdr["M_Exp_Date"].ToString();
                    U.M_Stock = Convert.ToInt32(rdr["M_Stock"]);

                    ULst.Add(U);
                }
                con.Close();
            }
            return ULst;
        }


        public int DeleteRecord(MedicineModel model)
        {
            if (model.M_Id != 0)
            {
                using (con)
                {
                    cmd = new SqlCommand("DeleteMedicineRecord", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@M_Id", SqlDbType.Int).Value = model.M_Id;
                    cmd.ExecuteNonQuery();
                    con.Close();

                }
            }
            return 1;
        }


    }
}
