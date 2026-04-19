import fs from "fs";
import path from "path";

export const POST = async (request: Request) => {
  try {
    const { name, email, subject, yourProject } = await request.json();

    // Here you can handle the form data, e.g., save it to a database or send an email
    console.log("Received contact form submission:", {
      name,
      email,
      subject,
      yourProject,
    });

    try {
      dataValidation({ name, email, subject, yourProject });
    } catch (validationError: unknown) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({
          success: false,
          message: (validationError as Error).message,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    await updateJsonFile({
      name,
      email,
      subject,
      yourProject,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully!",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to submit form." }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
};

const dataValidation = (data: {
  name: string;
  email: string;
  subject: string;
  yourProject: string;
}) => {
  const { name, email, subject, yourProject } = data;

  if (!name && !email && !subject && !yourProject) {
    const error = {
      message: "All fields are required.",
      field: "all",
    };
    throw new Error(JSON.stringify(error));
  }
  if (!name) {
    const error = {
      message: "Name is required.",
      field: "name",
    };
    throw new Error(JSON.stringify(error));
  }
  if (!email) {
    const error = {
      message: "Email is required.",
      field: "email",
    };
    throw new Error(JSON.stringify(error));
  }
  if (!subject) {
    const error = {
      message: "Subject is required.",
      field: "subject",
    };
    throw new Error(JSON.stringify(error));
  }
  if (!yourProject) {
    const error = {
      message: "Project description is required.",
      field: "yourProject",
    };
    throw new Error(JSON.stringify(error));
  }

  if (name.length < 2) {
    const error = {
      message: "Name is too short. Please provide your full name.",
      field: "name",
    };
    throw new Error(JSON.stringify(error));
  }
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = {
      message: "Invalid email format. Please provide a valid email address.",
      field: "email",
    };
    throw new Error(JSON.stringify(error));
  }
  if (subject.length < 5) {
    const error = {
      message:
        "Subject is too short. Please provide a more descriptive subject.",
      field: "subject",
    };
    throw new Error(JSON.stringify(error));
  }
  if (yourProject.length < 10) {
    const error = {
      message:
        "Project description is too short. Please provide more details (at least 10 characters).",
      field: "yourProject",
    };
    throw new Error(JSON.stringify(error));
  }
};

const updateJsonFile = async (data: {
  name: string;
  email: string;
  subject: string;
  yourProject: string;
}) => {
  try {
    const filePath = path.join(process.cwd(), "data", "contactDetails.csv");

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing content or create new file
    let existingContent = "";
    if (fs.existsSync(filePath)) {
      existingContent = fs.readFileSync(filePath, "utf-8");
    } else {
      // Add CSV header if file doesn't exist
      existingContent = "Name,Email,Subject,Project\n";
    }

    const newEntry = `${data.name},${data.email},${data.subject},"${data.yourProject.replace(/"/g, '""')}"\n`;
    fs.writeFileSync(filePath, existingContent + newEntry, "utf-8");
    console.log("Contact details saved successfully to:", filePath);
  } catch (error) {
    console.error("Failed to save contact details:", error);
    throw error;
  }
};
