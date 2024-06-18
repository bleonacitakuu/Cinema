using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactFormController : Controller
    {
        private readonly IConfiguration _configuration;

        public ContactFormController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT Id, Name, Email, message FROM dbo.ContactForm";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
                myCon.Close();
            }

            return new JsonResult(table);
        }

        
        [HttpPost]
        public JsonResult Post(ContactForm contactForm)
        {
            string query = @"
                INSERT INTO dbo.ContactForm (Name, Email, message)
                VALUES (@Name, @Email, @message)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Name", contactForm.Name);
                    myCommand.Parameters.AddWithValue("@Email", contactForm.Email);
                    myCommand.Parameters.AddWithValue("@message", contactForm.message);
                    myCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return new JsonResult("Added Successfully");
        }

      
        [HttpPut("{id}")]
        public JsonResult Put(int id, ContactForm contactForm)
        {
            string query = @"
                UPDATE dbo.ContactForm SET 
                Name = @Name,
                Email = @Email,
                message = @message
                WHERE Id = @Id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
                    myCommand.Parameters.AddWithValue("@Name", contactForm.Name);
                    myCommand.Parameters.AddWithValue("@Email", contactForm.Email);
                    myCommand.Parameters.AddWithValue("@message", contactForm.message);
                    myCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                DELETE FROM dbo.ContactForm 
                WHERE Id = @Id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
                    myCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
