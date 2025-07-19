"use client";

import { resumeSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EntryForm from "./entry-form";
import { entriesToMarkdown } from "@/app/lib/helper";
import MDEditor from "@uiw/react-md-editor";
import { useUser } from "@clerk/nextjs";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import useFetch from "@/hooks/use-fetch";
import { saveResume } from "@/actions/resume";
import { toast } from "sonner";


const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [resumeMode,setResumeMode] = useState("preview");
  const [previewContent,setPreviewContent]=useState(initialContent);
  const {user}=useUser();
  const [isGenerating,setIsGenerating]=useState(false);


  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

    const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

    useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  

  const getContactMarkdown=()=>{
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  }

  const getCombinedContent=()=>{
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume!");
    }
  }, [saveResult, saveError, isSaving]);


  const onSubmit=async()=>{
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  }

 const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      if (!element) throw new Error("Resume element not found");

      // Create a new div with the same content (not a clone)
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = element.innerHTML;
      tempDiv.style.width = "210mm";
      tempDiv.style.minHeight = "297mm";
      tempDiv.style.padding = "20mm";
      tempDiv.style.backgroundColor = "white";
      tempDiv.style.color = "black";
      tempDiv.style.boxSizing = "border-box";
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";

      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#FFFFFF",
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc, element) => {
          // Ensure styles are applied in the clone
          element.style.width = "210mm";
          element.style.minHeight = "297mm";
        },
      });

      document.body.removeChild(tempDiv);

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas rendering failed");
      }

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${user?.fullName.toLowerCase() + "-resume" || "resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold text-5xl md:text-6xl">Resume Builder</h1>

        <div className="sapce-x-2">
          <Button
            onClick={onSubmit}
            disabled={isSaving}
            variant="destructive"
          >
            {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
              ) : (
                  <>
                    <Save className="h-4 w-4" /> Save
                  </>
              )}
          </Button>

          <Button onClick={generatePDF} disabled={isGenerating}>
            {
              isGenerating ? (
                <>
                <Loader2 className="h-4 w-4 animate-spin"/>
                  Generating PDF...
                </>
              ):(
                <>
              <Download className="h-4 w-4" />
            Download
            </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit"> Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <form className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium ">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <label className="text-lg font-medium">Email</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="abc@gmail.com"
                    error={errors.contactInfo?.email}
                  />

                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-medium">Mobile Number</label>
                  <Input
                    {...register("contactInfo.contactInfo")}
                    type="tel"
                    placeholder="+ 1 987 654 3211"
                    error={errors.contactInfo?.mobile}
                  />

                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-medium">LinkedIn</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    error={errors.contactInfo?.linkedin}
                  />

                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Twitter/X Profile
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>


            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skills..."
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            
            
              <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                  
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">{errors.education.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="projects"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">{errors.projects.message}</p>
              )}
            </div>
            

            
            
            
          </form>
        </TabsContent>

        <TabsContent value="preview">
              

          <Button variant="Link" type="button" className="mb-2"
          onClick={()=>
            setResumeMode(resumeMode==="preview"?"edit":"preview")
          }
          >
            {
              resumeMode === "preview" ? (
                <>
                <Edit className="h-4 w-4"/>
            Edit Resume
                </>
              ):(
                <>
                <Monitor className="h-4 w-4"/>
                Show Preview
                </>
              )
            }

          </Button>

          {
            resumeMode!=="preview" && (
              <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
                <AlertTriangle className="h-5 w-5"/>
                <span>
                  You will loose edited markdown if you will update the form data
                </span>
              </div>
            )
          }
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
