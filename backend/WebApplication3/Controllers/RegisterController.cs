using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegisterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            string query = @"SELECT id, name, lastname, birthday, email, password, logkey FROM Register";

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

            return Ok(table);
        }

        [HttpPost]
        public IActionResult Post(Register reg)
        {
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            string query = @"
                INSERT INTO Register (name, lastname, birthday, email, password, logkey)
                VALUES (@Name, @LastName, @Birthday, @Email, @Password, @LogKey)";

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Name", reg.name);
                    myCommand.Parameters.AddWithValue("@LastName", reg.lastname);
                    myCommand.Parameters.AddWithValue("@Birthday", reg.birthday);
                    myCommand.Parameters.AddWithValue("@Email", reg.email);
                    myCommand.Parameters.AddWithValue("@Password", reg.password);
                    myCommand.Parameters.AddWithValue("@LogKey", reg.logkey);

                    myCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return Ok("Added Successfully");
        }

        [HttpPut]
        public IActionResult Put(Register reg)
        {
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            string query = @"
                UPDATE Register 
                SET name = @Name, 
                    lastname = @LastName, 
                    birthday = @Birthday, 
                    email = @Email, 
                    password = @Password, 
                    logkey = @LogKey 
                WHERE id = @Id";

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", reg.id);
                    myCommand.Parameters.AddWithValue("@Name", reg.name);
                    myCommand.Parameters.AddWithValue("@LastName", reg.lastname);
                    myCommand.Parameters.AddWithValue("@Birthday", reg.birthday);
                    myCommand.Parameters.AddWithValue("@Email", reg.email);
                    myCommand.Parameters.AddWithValue("@Password", reg.password);
                    myCommand.Parameters.AddWithValue("@LogKey", reg.logkey);

                    myCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return Ok("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            string query = @"DELETE FROM Register WHERE id = @Id";

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

            return Ok("Deleted Successfully");
        }
    }
}
