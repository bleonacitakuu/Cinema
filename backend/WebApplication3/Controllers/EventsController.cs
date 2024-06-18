using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EventsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT EventID, Title, Image, Movie FROM dbo.Events";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(IFormCollection form)
        {
            try
            {
                if (form.Files.Count == 0)
                {
                    throw new ArgumentException("No files uploaded");
                }

                var title = form["Title"].ToString();
                var movie = form["Movie"].ToString();
                var postedFile = form.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = Path.Combine(_env.ContentRootPath, "Photos", filename);

                // Ensure the Photos directory exists
                if (!Directory.Exists(Path.Combine(_env.ContentRootPath, "Photos")))
                {
                    Directory.CreateDirectory(Path.Combine(_env.ContentRootPath, "Photos"));
                }

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                string query = @"INSERT INTO dbo.Events (Title, Movie, Image) VALUES (@Title, @Movie, @Image)";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@Title", title);
                        myCommand.Parameters.AddWithValue("@Movie", movie);
                        myCommand.Parameters.AddWithValue("@Image", filename);
                        myCommand.ExecuteNonQuery();
                    }
                }

                return new JsonResult("Added Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult("Failed to Add: " + ex.Message);
            }
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = Path.Combine(_env.ContentRootPath, "Photos", filename);

                // Ensure the Photos directory exists
                if (!Directory.Exists(Path.Combine(_env.ContentRootPath, "Photos")))
                {
                    Directory.CreateDirectory(Path.Combine(_env.ContentRootPath, "Photos"));
                }

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.Events WHERE EventID=@EventID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EventID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}


