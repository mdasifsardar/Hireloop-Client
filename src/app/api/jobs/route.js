import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL);
const db = client.db("hireloop");

export async function POST(request) {
  try {
    const body = await request.json();

    // Keep it simple — only the basics are required
    const { jobTitle, companyName, jobCategory, jobType } = body ?? {};
    if (!jobTitle || !companyName || !jobCategory || !jobType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await db.collection("jobs").insertOne({
      ...body,
      salaryMin: body.salaryMin ? Number(body.salaryMin) : null,
      salaryMax: body.salaryMax ? Number(body.salaryMax) : null,
      createdAt: new Date(),
    });

    return Response.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/jobs failed:", error);
    return Response.json({ error: "Failed to save job" }, { status: 500 });
  }
}
