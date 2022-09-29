using System.ComponentModel.DataAnnotations;

namespace ASP.NETCoreIdentityCustom.Models
{
    public class UserManagementModel
    {
        [Key]
        public int UID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public char UserRole { get; set; }
        [Required]
        public char IsActive { get; set; }

        public void setUID(int UID)
        {
            this.UID = UID;
        }
        public void setFirstName(string FirstName)
        {
            this.FirstName = FirstName;
        }
        public void setLastName(string LastName)
        {
            this.LastName = LastName;
        }
        public void setEmail(string Email)
        {
            this.Email = Email;
        }
        public void setPassword(string Password)
        {
            this.Password = Password;
        }

        public void setUserRole(char UserRole)
        {
            this.UserRole = UserRole;
        }
        public void setIsActive(char IsActive)
        {
            this.IsActive = IsActive;
        }

        public int getUID()
        {
            return this.UID;
        }

        public string getFirstName()
        {
            return this.FirstName;
        }

        public string getLastName()
        {
            return this.LastName;
        }
        public string getEmail()
        {
            return this.Email;
        }
        public string getPassword()
        {
            return this.Password;
        }

        public char getUserRole()
        { return this.UserRole; }

        public char getIsActive()
        { return this.IsActive; }


    }
}
