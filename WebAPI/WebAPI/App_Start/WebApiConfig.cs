﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http.Cors;

namespace WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(
                new MediaTypeHeaderValue("text/html"));

            config.EnableCors(new EnableCorsAttribute("http://localhost:3000", "*", "*"));
        }
    }
}
