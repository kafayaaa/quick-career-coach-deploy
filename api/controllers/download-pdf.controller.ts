import PDFDocument from "pdfkit";
import { Request, Response } from "express";
import { AnalyzeResult } from "../types/analysisResult";

export const downloadPDF = async (req: Request, res: Response) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const data = req.body as AnalyzeResult;

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cv-analysis-premium.pdf"
    );

    doc.pipe(res);

    // ============================
    // HEADER PREMIUM
    // ============================
    doc.rect(0, 0, doc.page.width, 90).fill("#0EA5E9"); // sky-500

    doc
      .fill("#FFFFFF")
      .fontSize(26)
      .font("Helvetica-Bold")
      .text("CV Analysis Report", 50, 30);

    doc.moveDown(3);

    // =============================
    // UTILITY FUNCTIONS
    // =============================

    const sectionTitle = (title: string) => {
      doc
        .moveDown(1)
        .fill("#0284C7") // sky-600
        .font("Helvetica-Bold")
        .fontSize(16)
        .text(title)
        .fillColor("#000")
        .fontSize(12);
    };

    const card = (callback: () => void) => {
      const x = doc.x;
      const y = doc.y;

      doc
        .roundedRect(x - 5, y - 5, doc.page.width - 100, 0, 8)
        .stroke("#E0F2FE"); // sky-100 stroke

      callback();

      const height = doc.y - y + 10;
      doc
        .roundedRect(x - 5, y - 5, doc.page.width - 100, height, 8)
        .stroke("#BAE6FD"); // sky-200 border
      doc.moveDown(1);
    };

    // =============================
    // OVERALL SCORE
    // =============================
    sectionTitle("Overall Score");

    card(() => {
      doc.font("Helvetica-Bold").fontSize(18).fill("#0EA5E9");
      doc.text(`${data.cv.results.overall.score} / 100`, { align: "center" });
      doc.font("Helvetica").fill("#000");
    });

    // =============================
    // SECTION SCORES
    // =============================

    sectionTitle("Section Scores & Recommendations");

    Object.entries(data.cv.results).forEach(([key, val]) => {
      if (key === "overall") return;

      const section = val as {
        score: number;
        desc: string;
        recommend: string[];
      };

      card(() => {
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fill("#0284C7")
          .text(`✓ ${key.toUpperCase()}`);

        doc
          .moveDown(0.3)
          .font("Helvetica")
          .fontSize(12)
          .fill("#000")
          .text(`Score: ${section.score}`);

        doc.moveDown(0.3).text(`Description: ${section.desc}`);

        if (section.recommend?.length) {
          doc.moveDown(0.5).font("Helvetica-Bold").text("Recommendations:");
          doc.font("Helvetica");

          section.recommend.forEach((r: string) => {
            doc.text(`➤ ${r}`, { indent: 15 });
          });
        }
      });
    });

    // =============================
    // RECOMMENDATIONS (HIGH / MED / LOW)
    // =============================
    sectionTitle("Priority Recommendations");

    const prioritySection = (title: string, items: string[], color: string) => {
      card(() => {
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fill(color)
          .text(title)
          .fill("#000")
          .font("Helvetica");

        if (!items.length) {
          doc.text("No items.", { indent: 15 });
          return;
        }

        items.forEach((t) => doc.text(`• ${t}`, { indent: 15 }));
      });
    };

    prioritySection(
      "High Priority ⚠️",
      data.cv.recommendations.high,
      "#DC2626"
    );
    prioritySection(
      "Medium Priority ⚡",
      data.cv.recommendations.medium,
      "#F59E0B"
    );
    prioritySection("Low Priority ✓", data.cv.recommendations.low, "#16A34A");

    // =============================
    // SKILLS GAP ANALYSIS
    // =============================
    sectionTitle("Skills Gap Analysis");

    card(() => {
      doc.font("Helvetica-Bold").text("Matched Skills:");
      doc.font("Helvetica");
      data.skills_gap.matched_skills.forEach((s) => doc.text(`✓ ${s}`));

      doc.moveDown(0.8);

      doc.font("Helvetica-Bold").text("Missing Skills:");
      doc.font("Helvetica");
      data.skills_gap.missing_skills.forEach((s) => doc.text(`✖️ ${s}`));

      doc.moveDown(0.8);

      doc.font("Helvetica-Bold").text("Nice to Have Skills:");
      doc.font("Helvetica");
      data.skills_gap.nice_to_have_skills.forEach((s) => doc.text(`➤ ${s}`));
    });

    // =============================
    // LEARNING PATH (PER SKILL)
    // =============================
    sectionTitle("Learning Path Recommendations");

    data.skills_gap.recommendations.forEach((r: any) => {
      card(() => {
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fill("#0284C7")
          .text(`📘 Skill: ${r.skill}`)
          .fill("#000")
          .font("Helvetica")
          .fontSize(12);

        const levels = [
          { key: "fundamentals", label: "Fundamentals" },
          { key: "intermediate", label: "Intermediate" },
          { key: "advanced", label: "Advanced" },
        ];

        levels.forEach((lvl) => {
          const items = r.learning_path[lvl.key];

          doc.moveDown(0.5);
          doc.font("Helvetica-Bold").text(`${lvl.label}:`);
          doc.font("Helvetica");

          items.forEach((item: any) => {
            doc.text(`➤ ${item.title}`, { indent: 10 });
            doc.text(`${item.desc}`, { indent: 20 });

            item.rec_courses.forEach((c: any) => {
              doc.text(`• ${c.title}`, { indent: 25 });
              doc.text(`  Duration: ${c.duration}`, { indent: 25 });
              doc.text(`  URL: ${c.url}`, { indent: 25 });
            });
          });
        });

        // Practice Projects
        if (r.practice_projects?.length) {
          doc.moveDown(0.5).font("Helvetica-Bold").text("Practice Projects:");
          doc.font("Helvetica");

          r.practice_projects.forEach((p: string) =>
            doc.text(`➤ ${p}`, { indent: 15 })
          );
        }
      });
    });

    doc.end();
  } catch (error) {
    console.error("PDF error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
