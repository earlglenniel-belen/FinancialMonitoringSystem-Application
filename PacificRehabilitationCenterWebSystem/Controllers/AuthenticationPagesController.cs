using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PacificRehabilitationCenterWebSystem.Controllers
{
    public class AuthenticationPagesController : Controller
    {
        // Login Page
        public ActionResult Login()
        {
            return View();
        }

        // Registration Page
        public ActionResult Registration()
        {
            return View();
        }

    }
}