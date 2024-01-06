using System;
using System.IO;
using System.Threading.Tasks;
using NJsonSchema;
using NJsonSchema.CodeGeneration.TypeScript;
using NJsonSchema.Visitors;
using NSwag;
using NSwag.CodeGeneration.CSharp;
using NSwag.CodeGeneration.TypeScript;

namespace APIClientGenerator
{
  class Program
  {
    static async Task Main(string[] args)
    {
      if (args.Length != 3)
        throw new ArgumentException("Expecting 3 arguments: swaggerPath, generatePath, language");

      var url = args[0];
      var generatePath = Path.Combine(Directory.GetCurrentDirectory(), args[1]);
      var language = args[2];

      if (language != "TypeScript")
        throw new ArgumentException("Invalid language parameter; valid value are TypeScript");

      if (language == "TypeScript")
        await GenerateTypeScriptClient(url, generatePath);
    }

    async static Task GenerateTypeScriptClient(string path, string generatePath) =>
      await GenerateClient(
        document: await OpenApiDocument.FromJsonAsync(File.ReadAllText(path)),
        generatePath: generatePath,
        generateCode: (OpenApiDocument document) =>
        {
          var settings = new TypeScriptClientGeneratorSettings
          {
            GenerateClientClasses = true,
            GenerateOptionalParameters = true,
            ClientBaseClass = "ClientBase",
            UseTransformOptionsMethod = true,
            Template = TypeScriptTemplate.Fetch
          };

          settings.TypeScriptGeneratorSettings.ExtensionCode = "import { ClientBase } from './clientBase';";
          // - MultipleClientsFromFirstTagAndPathSegmentsOperationNameGenerator
          // - MultipleClientsFromFirstTagAndOperationNameGenerator
          // MultipleClientsFromFirstTagAndOperationIdGenerator *- snake
          // - MultipleClientsFromOperationIdOperationNameGenerator
          // - MultipleClientsFromPathSegmentsOperationNameGenerator
          settings.OperationNameGenerator = new OperationNameGenerator();
  
          // settings.CodeGeneratorSettings.PropertyNameGenerator = new PropertyNameGenerator();

          // settings.TypeScriptGeneratorSettings.TypeStyle = TypeScriptTypeStyle.Interface;
          // settings.TypeScriptGeneratorSettings.TypeScriptVersion = 3.5M;
          // settings.TypeScriptGeneratorSettings.DateTimeType = TypeScriptDateTimeType.String;

          var generator = new TypeScriptClientGenerator(document, settings);
          var code = generator.GenerateFile();

          return code;
        }
      );

    private async static Task GenerateClient(OpenApiDocument document, string generatePath, Func<OpenApiDocument, string> generateCode)
    {
      Console.WriteLine($"Generating {generatePath}...");

      var code = generateCode(document);

      await System.IO.File.WriteAllTextAsync(generatePath, code);
    }

  }

  public class PropertyNameGenerator: NJsonSchema.CodeGeneration.IPropertyNameGenerator
  {  
    public string Generate(JsonSchemaProperty property) {
      Console.WriteLine(property.Name);
      Console.WriteLine(property.Parent.GetHashCode());
      Console.WriteLine(property.Parent.GetType());

      return property.Name;
    }
  }
  public class OperationNameGenerator : NSwag.CodeGeneration.OperationNameGenerators.MultipleClientsFromFirstTagAndPathSegmentsOperationNameGenerator
  {  
    private NSwag.CodeGeneration.OperationNameGenerators.MultipleClientsFromFirstTagAndPathSegmentsOperationNameGenerator baseGenerator;
    // public  bool SupportsMultipleClients { get; }
    public OperationNameGenerator()
    {
      baseGenerator = new NSwag.CodeGeneration.OperationNameGenerators.MultipleClientsFromFirstTagAndPathSegmentsOperationNameGenerator();
      // SupportsMultipleClients = true;

    }
    public override string GetClientName(OpenApiDocument document, string path, string httpMethod, OpenApiOperation operation) {
      // Console.WriteLine(path);
      // Console.WriteLine(httpMethod);
      return baseGenerator.GetClientName(document, path, httpMethod, operation);
    }
    public override string GetOperationName(OpenApiDocument document, string path, string httpMethod, OpenApiOperation operation) {
      Console.WriteLine(path);
      Console.WriteLine(httpMethod);
      var result = baseGenerator.GetOperationName(document, path, httpMethod, operation);
      if (path.Contains("/auth/")) {
        result = result + "-auth";
      }
      if (path.Contains("api/v1/")) {
        var list = path.Split("api/v1/")[1].Split("/");
        result = String.Join("-", list.Skip(0).Take(list.Length)).Replace("{", "-by-").Replace("}", "-").Replace("_", "-");
      }
      result += "-" + httpMethod;
      Console.WriteLine(result);
      return result;
    }
  }
}