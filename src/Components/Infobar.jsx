import React from "react";

const Infobar = ({ filters, setFilters }) => {
  const salaryOptions = [150, 180, 200, 220, 250, 280, 300, 350, 400, 500];

  const designRoleOptions = [
    { label: "All", value: "all" },
    { label: "Accessibility Tester", value: "accessibility-tester" },
    { label: "Online Tutor", value: "online-tutor" },
    { label: "Data Entry Operator", value: "data-entry-operator" },
    { label: "Software Tester", value: "software-tester" },
    { label: "Graphic Designer", value: "graphic-designer" },
    { label: "Customer Support Executive", value: "customer-support-executive" },
    { label: "Transcriptionist", value: "transcriptionist" },
    { label: "HR Assistant", value: "hr-assistant" },
    { label: "Content Writer", value: "content-writer" },
    { label: "Junior Developer", value: "junior-developer" },
    { label: "Sign Language Interpreter", value: "sign-language-interpreter" },
    { label: "Social Media Manager", value: "social-media-manager" },
    { label: "E-commerce Product Lister", value: "ecommerce-product-lister" },
    { label: "Call Center Executive", value: "call-center-executive" },
    { label: "Proofreader", value: "proofreader" },
    { label: "Voice Over Artist", value: "voice-over-artist" },
    { label: "AI Training Data Annotator", value: "ai-training-data-annotator" },
    { label: "Virtual Assistant", value: "virtual-assistant" },
    { label: "UI/UX Designer", value: "ui-ux-designer" }
  ];
  

const locationOptions = [
  { label: "All", value: "all" },
  { label: "Remote", value: "remote" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Delhi", value: "delhi" },
  { label: "Chennai", value: "chennai" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Pune", value: "pune" },
];

const experienceOptions = [
  { label: "All", value: "all" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5+ years", value: "5+" },
];

const perMonthOptions = [
  { label: "All", value: "all" },
  { label: "Part-time", value: "part-time" },
  { label: "Full-time", value: "full-time" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
  { label: "Remote", value: "remote" },
];


  return (
    <div className="bg-dark shadow-md p-4 text-white">
      <div className="flex space-x-4 items-center">
        {/* Job Role Dropdown */}
        <div className="flex flex-col space-y-2 w-1/5">
          <label className="font-semibold text-sm">Job Role</label>
          <select
            value={filters.designRole}
            onChange={(e) => setFilters({ ...filters, designRole: e.target.value })}
            className="border rounded p-2 text-sm bg-black"
          >
            {designRoleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div className="flex flex-col space-y-2 w-1/5">
          <label className="text-sm">Work Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border rounded p-2 text-sm bg-black"
          >
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Dropdown */}
        <div className="flex flex-col space-y-2 w-1/5">
          <label className="text-sm">Experience</label>
          <select
            value={filters.experience}
            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
            className="border rounded p-2 text-sm bg-black"
          >
            {experienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Dropdown */}
        <div className="flex flex-col space-y-2 w-1/5">
          <label className="text-sm">Job Type</label>
          <select
            value={filters.perMonth}
            onChange={(e) => setFilters({ ...filters, perMonth: e.target.value })}
            className="border rounded p-2 text-sm bg-black"
          >
            {perMonthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div className="flex flex-col space-y-2 w-1/5">
          <label className="text-sm">Salary Range</label>
          <div className="flex space-x-2">
            <select
              value={filters.salaryRange.min}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  salaryRange: { ...filters.salaryRange, min: Number(e.target.value) },
                })
              }
              className="border rounded p-2 text-sm w-1/2 bg-black"
            >
              {salaryOptions.map((value) => (
                <option key={value} value={value}>
                  ${value}
                </option>
              ))}
            </select>
            <select
              value={filters.salaryRange.max}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  salaryRange: { ...filters.salaryRange, max: Number(e.target.value) },
                })
              }
              className="border rounded p-2 text-sm w-1/2 bg-black"
            >
              {salaryOptions.map((value) => (
                <option key={value} value={value}>
                  ${value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infobar;
