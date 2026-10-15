using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;

namespace PacificRehabilitationCenterWebSystem.Controllers
{
    public class MainPagesController : Controller
    {
        // Home Page
        public ActionResult Index()
        {
            return View();

        }

            // Welcome Message
            public string WelcomeMessage()
            {
                return "Welcome to the Pacific Rehabilitation Center!";
            }

        // About Page
        public ActionResult About()
        {
            return View();
        }

        // Contact Page
        public ActionResult Contact()
        {
            return View();
        }

    }
}
