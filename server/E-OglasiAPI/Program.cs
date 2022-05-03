using Authorization.Interfaces;
using Authorization.Middlewares.JwtMiddleware;
using Authorization.Services;
using Common.Config;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
{
    var services = builder.Services;

    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddScoped<IUserService, UserService>();

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