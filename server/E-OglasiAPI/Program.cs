using Authorization.Interfaces;
using Authorization.Middlewares.JwtMiddleware;
using Authorization.Services;
using Bussines_Logic.Implementation;
using Bussines_Logic.Interfaces;
using Common.Config;
using Database_Layer.Context;
using Database_Layer.Implementation;
using Database_Layer.Interfaces;
using Microsoft.EntityFrameworkCore;
using User_Interface_Layer.Implementation;
using User_Interface_Layer.Interfaces;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
{
    var services = builder.Services;

    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    string connectionString = builder.Configuration["AppSettings:ConnectionString"];
    services.AddDbContext<DatabaseContext>(
        options => options.UseSqlServer(connectionString));

    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IUserUIL, UserUIL>();
    services.AddScoped<IUserBL, UserBL>();
    services.AddScoped<IUserDAL, UserDAL>();
    services.AddScoped(typeof(IBaseDAL<>), typeof(BaseDAL<>));

    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
}

var app = builder.Build();
{
    app.UseAuthorization();

    app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

    app.MapControllers();

    app.UseJwtMiddleware();
}
string url = builder.Configuration.GetValue<string>("AppSettings:API_Url");

app.Run(url);