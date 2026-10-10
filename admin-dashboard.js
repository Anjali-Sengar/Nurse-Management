/* =====================================================================
   Smart Nurse Management System — Hospital Admin Dashboard
   Vanilla JS only. Mock data below stands in for GET/POST calls to an
   Express + MongoDB backend (see TODO markers for integration points).
===================================================================== */
(function () {
  "use strict";

  /* -------------------------------------------------------------
     MOCK DATA
     TODO(backend): replace with fetch() calls, e.g.
       GET /api/admin/doctors        POST /api/admin/doctors/invite
       GET /api/admin/nurses         POST /api/admin/nurses/invite
       GET /api/admin/patients       POST /api/admin/patients
       GET /api/admin/tasks          POST /api/admin/tasks
       GET /api/admin/audit-logs
  ------------------------------------------------------------- */
  const state = {
    departments: ["General Medicine", "Cardiology", "Orthopedics", "Pediatrics", "Surgery"],

    doctors: [
      { id: "SN-DOC-0217", name: "Dr. Aman Verma", dept: "General Medicine", email: "aman.verma@sunrisehospital.org", status: "active", patientsCount: 4 },
      { id: "SN-DOC-0318", name: "Dr. Neha Kulkarni", dept: "Surgery", email: "neha.kulkarni@sunrisehospital.org", status: "active", patientsCount: 3 },
      { id: "SN-DOC-0402", name: "Dr. Sanjay Bhatt", dept: "Cardiology", email: "sanjay.bhatt@sunrisehospital.org", status: "inactive", patientsCount: 0 },
    ],

    nurses: [
      { id: "SN-NUR-1042", name: "Riya Kapoor", dept: "General Medicine", shift: "Morning · 7:00 AM – 3:00 PM", email: "riya.kapoor@sunrisehospital.org", status: "active", patientsCount: 4 },
      { id: "SN-NUR-1108", name: "Alok Sen", dept: "General Medicine", shift: "Evening · 3:00 PM – 11:00 PM", email: "alok.sen@sunrisehospital.org", status: "active", patientsCount: 3 },
      { id: "SN-NUR-1155", name: "Meera Joshi", dept: "Surgery", shift: "Morning · 7:00 AM – 3:00 PM", email: "meera.joshi@sunrisehospital.org", status: "active", patientsCount: 2 },
      { id: "SN-NUR-1201", name: "Farhan Khan", dept: "Cardiology", shift: "Night · 11:00 PM – 7:00 AM", email: "farhan.khan@sunrisehospital.org", status: "inactive", patientsCount: 0 },
    ],

    patients: [
      { id: "P-1042", name: "Anita Sharma", room: "B-204", priority: "medium", doctor: "Dr. Aman Verma", nurse: "Riya Kapoor", status: "Admitted" },
      { id: "P-1043", name: "Ramesh Iyer", room: "B-207", priority: "high", doctor: "Dr. Aman Verma", nurse: "Riya Kapoor", status: "Admitted" },
      { id: "P-1044", name: "Fatima Sheikh", room: "B-210", priority: "low", doctor: "Dr. Neha Kulkarni", nurse: "Alok Sen", status: "Admitted" },
      { id: "P-1045", name: "Vikram Nair", room: "B-201", priority: "low", doctor: "Dr. Aman Verma", nurse: "Alok Sen", status: "Admitted" },
      { id: "P-1046", name: "Sunita Rao", room: "B-212", priority: "high", doctor: "Dr. Aman Verma", nurse: "Riya Kapoor", status: "Admitted" },
      { id: "P-1039", name: "Kavita Desai", room: "B-198", priority: "low", doctor: "Dr. Neha Kulkarni", nurse: "Meera Joshi", status: "Discharged" },
    ],

    pendingInstructions: [
      { id: "PI1", patient: "Anita Sharma", doctor: "Dr. Aman Verma", instruction: "Monitor blood pressure every 4 hours. Report if systolic > 150.", priority: "high", datetime: "Today, 07:45" },
      { id: "PI2", patient: "Sunita Rao", doctor: "Dr. Aman Verma", instruction: "Confirm pre-op checklist and consent form before 11:00 AM.", priority: "high", datetime: "Today, 07:30" },
    ],

    tasks: [
      { id: "T1", patient: "Anita Sharma", nurse: "Riya Kapoor", task: "Check vitals (BP, temperature, pulse)", time: "08:00", priority: "high", status: "pending", createdBy: "Dr. Aman Verma", lastUpdate: "Today, 07:50" },
      { id: "T2", patient: "Ramesh Iyer", nurse: "Riya Kapoor", task: "Administer scheduled medication", time: "08:30", priority: "high", status: "completed", createdBy: "Dr. Aman Verma", lastUpdate: "Today, 08:35" },
      { id: "T3", patient: "Fatima Sheikh", nurse: "Alok Sen", task: "Change wound dressing", time: "09:00", priority: "medium", status: "pending", createdBy: "Dr. Neha Kulkarni", lastUpdate: "Today, 06:10" },
      { id: "T4", patient: "Vikram Nair", nurse: "Alok Sen", task: "Assist with mobility exercise", time: "09:30", priority: "low", status: "completed", createdBy: "Admin — Priya Menon", lastUpdate: "Today, 09:40" },
      { id: "T5", patient: "Sunita Rao", nurse: "Riya Kapoor", task: "Confirm pre-op checklist", time: "10:30", priority: "high", status: "overdue", createdBy: "Dr. Aman Verma", lastUpdate: "Today, 07:32" },
    ],

    nurseSchedule: [
      { nurse: "Riya Kapoor", shift: "Morning", patients: ["Anita Sharma", "Ramesh Iyer", "Sunita Rao"], tasks: 6, start: "07:00", end: "15:00", availability: "On Duty", conflict: false },
      { nurse: "Alok Sen", shift: "Evening", patients: ["Fatima Sheikh", "Vikram Nair"], tasks: 4, start: "15:00", end: "23:00", availability: "Off Duty", conflict: false },
      { nurse: "Meera Joshi", shift: "Morning", patients: ["Kavita Desai"], tasks: 1, start: "07:00", end: "15:00", availability: "On Duty", conflict: true },
      { nurse: "Meera Joshi", shift: "Morning (OT Cover)", patients: ["Fatima Sheikh"], tasks: 2, start: "09:00", end: "13:00", availability: "On Duty", conflict: true },
      { nurse: "Farhan Khan", shift: "Night", patients: [], tasks: 0, start: "23:00", end: "07:00", availability: "Unavailable", conflict: false },
    ],

    doctorSchedule: [
      { doctor: "Dr. Aman Verma", dept: "General Medicine", shift: "Day · On Call", start: "08:00", end: "18:00", availability: "Available" },
      { doctor: "Dr. Neha Kulkarni", dept: "Surgery", shift: "Day", start: "07:00", end: "15:00", availability: "In Surgery" },
      { doctor: "Dr. Sanjay Bhatt", dept: "Cardiology", shift: "—", start: "—", end: "—", availability: "Inactive" },
    ],

    messages: [
      { id: "MSG1", contact: "Dr. Aman Verma", preview: "Can you confirm the OT slot for Sunita Rao?", time: "08:15", unread: true },
      { id: "MSG2", contact: "Nurse Riya Kapoor", preview: "Shift handover notes are ready for review.", time: "07:55", unread: true },
      { id: "MSG3", contact: "Nurse Meera Joshi", preview: "Flagging a scheduling overlap for today.", time: "07:40", unread: false },
      { id: "MSG4", contact: "Dr. Neha Kulkarni", preview: "Thanks for reassigning Fatima's follow-up.", time: "Yesterday", unread: false },
    ],

    notifications: [
      { id: "N1", text: "New instruction from Dr. Aman Verma needs nurse assignment.", time: "12 min ago", read: false },
      { id: "N2", text: "Scheduling conflict detected for Nurse Meera Joshi.", time: "25 min ago", read: false },
      { id: "N3", text: "Task overdue: pre-op checklist for Sunita Rao.", time: "40 min ago", read: false },
      { id: "N4", text: "Dr. Sanjay Bhatt's account was deactivated.", time: "2 hr ago", read: true },
    ],

    auditLogs: [
      { id: "A1", actor: "Priya Menon (Admin)", action: "Assigned Nurse Riya Kapoor to patient Anita Sharma", target: "Anita Sharma", datetime: "Today, 07:52" },
      { id: "A2", actor: "Priya Menon (Admin)", action: "Deactivated doctor account", target: "Dr. Sanjay Bhatt", datetime: "Today, 06:30" },
      { id: "A3", actor: "Priya Menon (Admin)", action: "Generated nurse invitation ID", target: "New nurse invite", datetime: "Yesterday, 17:10" },
      { id: "A4", actor: "Dr. Aman Verma", action: "Sent instruction for patient", target: "Sunita Rao", datetime: "Yesterday, 16:40" },
      { id: "A5", actor: "Priya Menon (Admin)", action: "Registered new patient", target: "Sunita Rao", datetime: "Yesterday, 09:15" },
      { id: "A6", actor: "Nurse Riya Kapoor", action: "Completed task: administer medication", target: "Ramesh Iyer", datetime: "Yesterday, 08:35" },
    ],
  };

  let taskFilter = "all";

  /* -------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------- */
  function priorityBadge(priority) {
    const label = priority.charAt(0).toUpperCase() + priority.slice(1);
    return `<span class="badge badge-${priority}">${label}</span>`;
  }

  function taskStatusBadge(status) {
    const map = {
      pending: ["Pending", "pending"],
      completed: ["Completed", "completed"],
      overdue: ["Overdue", "high"],
    };
    const [label, cls] = map[status] || [status, "pending"];
    return `<span class="badge badge-${cls}">${label}</span>`;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function initials(name) {
    return name
      .replace(/^(Dr\.|Nurse|Admin —)\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  function generateInviteCode(role) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return `SN-${role}-${code}`;
  }

  /* -------------------------------------------------------------
     SUMMARY
  ------------------------------------------------------------- */
  function updateSummary() {
    document.getElementById("statDoctors").textContent = state.doctors.length;
    document.getElementById("statNurses").textContent = state.nurses.length;
    document.getElementById("statActivePatients").textContent = state.patients.filter((p) => p.status === "Admitted").length;
    document.getElementById("statPendingTasks").textContent = state.tasks.filter((t) => t.status !== "completed").length;
    document.getElementById("statUrgentPatients").textContent = state.patients.filter((p) => p.priority === "high" && p.status === "Admitted").length;
    const onDuty =
      state.doctors.filter((d) => d.status === "active").length +
      state.nurses.filter((n) => n.status === "active" && n.availability !== "Off Duty").length;
    document.getElementById("statOnDuty").textContent = onDuty;

    const pendingTaskCount = state.tasks.filter((t) => t.status !== "completed").length;
    const navTaskCount = document.getElementById("navTaskCount");
    navTaskCount.textContent = pendingTaskCount;
    navTaskCount.dataset.zero = pendingTaskCount === 0;

    const unreadNotifs = state.notifications.filter((n) => !n.read).length;
    const navNotifCount = document.getElementById("navNotifCount");
    navNotifCount.textContent = unreadNotifs;
    navNotifCount.dataset.zero = unreadNotifs === 0;
    document.getElementById("topNotifDot").dataset.hidden = unreadNotifs === 0;
  }

  /* -------------------------------------------------------------
     DASHBOARD OVERVIEW
  ------------------------------------------------------------- */
  function renderPendingInstructionsPreview() {
    const html = state.pendingInstructions
      .slice(0, 3)
      .map(
        (i) => `
      <div class="data-row" style="grid-template-columns: 1.2fr 2fr 90px;">
        <span class="cell-patient" data-label="Patient"><strong>${i.patient}</strong><span>${i.doctor}</span></span>
        <span class="cell-instruction" data-label="Instruction">${i.instruction}</span>
        <span class="row-action" data-label=""><button class="btn btn-xs btn-primary" data-goto="tasks">Assign</button></span>
      </div>`
      )
      .join("");
    document.getElementById("pendingInstructionsPreview").innerHTML =
      html || `<p style="padding:16px;color:var(--color-muted);font-size:13.5px;">No instructions waiting for assignment.</p>`;
  }

  function renderUrgentPatientsList() {
    const urgent = state.patients.filter((p) => p.priority === "high" && p.status === "Admitted");
    document.getElementById("urgentPatientsList").innerHTML =
      urgent
        .map(
          (p) => `
      <div class="data-row" style="grid-template-columns: 1.3fr 1fr 1fr 90px;">
        <span class="cell-patient" data-label="Patient"><strong>${p.name}</strong><span>${p.room}</span></span>
        <span data-label="Doctor">${p.doctor}</span>
        <span data-label="Nurse">${p.nurse}</span>
        <span class="row-action" data-label="">${priorityBadge(p.priority)}</span>
      </div>`
        )
        .join("") || `<p style="padding:16px;color:var(--color-muted);font-size:13.5px;">No urgent patients right now.</p>`;
  }

  /* -------------------------------------------------------------
     RENDER: DOCTORS
  ------------------------------------------------------------- */
  function renderDoctors() {
    document.getElementById("doctorList").innerHTML = state.doctors
      .map(
        (d) => `
      <div class="data-row staff-row-grid">
        <span class="cell-patient" data-label="Doctor"><strong>${d.name}</strong><span>${d.id}</span></span>
        <span data-label="Department">${d.dept}</span>
        <span data-label="Patients">${d.patientsCount}</span>
        <span data-label="Status">
          <label class="status-toggle ${d.status === "active" ? "is-active" : "is-inactive"}">
            <span class="toggle-switch"><input type="checkbox" data-action="toggle-doctor" data-id="${d.id}" ${d.status === "active" ? "checked" : ""}><span class="toggle-slider"></span></span>
            ${d.status === "active" ? "Active" : "Inactive"}
          </label>
        </span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-secondary" data-action="view-doctor-patients" data-id="${d.id}">View Patients</button>
        </span>
      </div>`
      )
      .join("");
  }

  function handleDoctorToggle(id) {
    const doctor = state.doctors.find((d) => d.id === id);
    if (!doctor) return;
    doctor.status = doctor.status === "active" ? "inactive" : "active";
    // TODO(backend): PATCH /api/admin/doctors/:id { status }
    addAuditLog(`${doctor.status === "active" ? "Activated" : "Deactivated"} doctor account`, doctor.name);
    renderDoctors();
    updateSummary();
    showToast(`${doctor.name} is now ${doctor.status}.`);
  }

  /* -------------------------------------------------------------
     RENDER: NURSES
  ------------------------------------------------------------- */
  function renderNurses() {
    document.getElementById("nurseList").innerHTML = state.nurses
      .map(
        (n) => `
      <div class="data-row nurse-row-grid">
        <span class="cell-patient" data-label="Nurse"><strong>${n.name}</strong><span>${n.id}</span></span>
        <span data-label="Department">${n.dept}</span>
        <span class="cell-room" data-label="Shift">${n.shift}</span>
        <span data-label="Patients">${n.patientsCount}</span>
        <span data-label="Status">
          <label class="status-toggle ${n.status === "active" ? "is-active" : "is-inactive"}">
            <span class="toggle-switch"><input type="checkbox" data-action="toggle-nurse" data-id="${n.id}" ${n.status === "active" ? "checked" : ""}><span class="toggle-slider"></span></span>
            ${n.status === "active" ? "Active" : "Inactive"}
          </label>
        </span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-secondary" data-action="view-nurse-patients" data-id="${n.id}">View Patients</button>
        </span>
      </div>`
      )
      .join("");
  }

  function handleNurseToggle(id) {
    const nurse = state.nurses.find((n) => n.id === id);
    if (!nurse) return;
    nurse.status = nurse.status === "active" ? "inactive" : "active";
    // TODO(backend): PATCH /api/admin/nurses/:id { status }
    addAuditLog(`${nurse.status === "active" ? "Activated" : "Deactivated"} nurse account`, nurse.name);
    renderNurses();
    updateSummary();
    showToast(`${nurse.name} is now ${nurse.status}.`);
  }

  /* -------------------------------------------------------------
     RENDER: ADMIN PATIENTS
  ------------------------------------------------------------- */
  function renderAdminPatients() {
    document.getElementById("adminPatientList").innerHTML = state.patients
      .map(
        (p) => `
      <div class="data-row admin-patient-row-grid">
        <span class="cell-patient" data-label="Patient"><strong>${p.name}</strong><span>${p.id}</span></span>
        <span class="cell-room" data-label="Room/Bed">${p.room}</span>
        <span data-label="Assigned Doctor">${p.doctor}</span>
        <span data-label="Assigned Nurse">${p.nurse}</span>
        <span data-label="Priority">${priorityBadge(p.priority)}</span>
        <span data-label="Status"><span class="badge ${p.status === "Admitted" ? "badge-progress" : "badge-completed"}">${p.status}</span></span>
        <span class="row-action" data-label="">
          ${
            p.status === "Admitted"
              ? `<button class="btn btn-xs btn-secondary" data-action="discharge-patient" data-id="${p.id}">Discharge</button>`
              : `<button class="btn btn-xs btn-secondary" data-action="readmit-patient" data-id="${p.id}">Re-admit</button>`
          }
        </span>
      </div>`
      )
      .join("");
  }

  function handleDischargeToggle(id, discharge) {
    const patient = state.patients.find((p) => p.id === id);
    if (!patient) return;
    patient.status = discharge ? "Discharged" : "Admitted";
    // TODO(backend): PATCH /api/admin/patients/:id { status }
    addAuditLog(discharge ? "Marked patient as discharged" : "Re-admitted patient", patient.name);
    renderAdminPatients();
    renderAssignments();
    updateSummary();
    showToast(`${patient.name} marked as ${patient.status.toLowerCase()}.`);
  }

  /* -------------------------------------------------------------
     RENDER: ASSIGNMENTS
  ------------------------------------------------------------- */
  function renderAssignments(filterText = "") {
    const q = filterText.trim().toLowerCase();
    const list = state.patients.filter((p) => p.status === "Admitted" && (!q || p.name.toLowerCase().includes(q)));
    const doctorOptions = state.doctors.filter((d) => d.status === "active").map((d) => `<option>${d.name}</option>`).join("");
    const nurseOptions = state.nurses.filter((n) => n.status === "active").map((n) => `<option>${n.name}</option>`).join("");

    document.getElementById("assignmentGrid").innerHTML =
      list
        .map(
          (p) => `
      <div class="assignment-card" data-patient-id="${p.id}">
        <div class="assignment-patient"><strong>${p.name}</strong><span>${p.id} · ${p.room}</span></div>
        <div class="assignment-field">
          <span>Doctor</span>
          <select data-action="reassign-doctor" data-id="${p.id}">${doctorOptions.replace(`>${p.doctor}<`, ` selected>${p.doctor}<`)}</select>
        </div>
        <div class="assignment-field">
          <span>Nurse</span>
          <select data-action="reassign-nurse" data-id="${p.id}">${nurseOptions.replace(`>${p.nurse}<`, ` selected>${p.nurse}<`)}</select>
        </div>
        <div>${priorityBadge(p.priority)}</div>
      </div>`
        )
        .join("") || `<p style="color:var(--color-muted);font-size:14px;">No admitted patients match your search.</p>`;
  }

  function handleReassign(patientId, field, value) {
    const patient = state.patients.find((p) => p.id === patientId);
    if (!patient) return;
    const prev = patient[field];
    patient[field] = value;
    // TODO(backend): PATCH /api/admin/patients/:id { doctor|nurse: value }
    addAuditLog(`Reassigned ${field === "doctor" ? "doctor" : "nurse"} from ${prev} to ${value}`, patient.name);
    renderAdminPatients();
    showToast(`${patient.name}'s ${field} updated to ${value}.`);
  }

  /* -------------------------------------------------------------
     RENDER: NURSE / DOCTOR SCHEDULE
  ------------------------------------------------------------- */
  function availabilityBadge(av) {
    const cls = av === "On Duty" || av === "Available" ? "completed" : av === "Off Duty" || av === "Inactive" || av === "Unavailable" ? "pending" : "progress";
    return `<span class="badge badge-${cls}">${av}</span>`;
  }

  function renderNurseSchedule() {
    document.getElementById("nurseScheduleList").innerHTML = state.nurseSchedule
      .map(
        (s) => `
      <div class="data-row nurse-schedule-row-grid ${s.conflict ? "is-overdue" : ""}">
        <span class="cell-patient" data-label="Nurse"><strong>${s.nurse}</strong>${s.conflict ? '<span style="color:var(--color-red);">⚠ Conflict</span>' : ""}</span>
        <span data-label="Shift">${s.shift}</span>
        <span class="cell-instruction" data-label="Assigned Patients">${s.patients.length ? s.patients.join(", ") : "—"}</span>
        <span data-label="Tasks">${s.tasks}</span>
        <span class="cell-time" data-label="Start">${s.start}</span>
        <span class="cell-time" data-label="End">${s.end}</span>
        <span data-label="Availability">${availabilityBadge(s.availability)}</span>
      </div>`
      )
      .join("");

    const conflicts = state.nurseSchedule.filter((s) => s.conflict);
    const banner = document.getElementById("nurseConflictBanner");
    if (conflicts.length) {
      banner.hidden = false;
      const names = [...new Set(conflicts.map((c) => c.nurse))].join(", ");
      document.getElementById("nurseConflictText").textContent = `Scheduling conflict detected for ${names}: overlapping shifts assigned on the same day. Review and adjust before the shift begins.`;
    } else {
      banner.hidden = true;
    }
  }

  function renderDoctorSchedule() {
    document.getElementById("doctorScheduleList").innerHTML = state.doctorSchedule
      .map(
        (s) => `
      <div class="data-row doctor-schedule-row-grid">
        <span class="cell-patient" data-label="Doctor"><strong>${s.doctor}</strong></span>
        <span data-label="Department">${s.dept}</span>
        <span data-label="Shift">${s.shift}</span>
        <span class="cell-time" data-label="Start">${s.start}</span>
        <span class="cell-time" data-label="End">${s.end}</span>
        <span data-label="Availability">${availabilityBadge(s.availability)}</span>
      </div>`
      )
      .join("");
  }

  /* -------------------------------------------------------------
     RENDER: TASKS
  ------------------------------------------------------------- */
  function populateTaskSelects() {
    document.getElementById("taskPatient").innerHTML = state.patients
      .filter((p) => p.status === "Admitted")
      .map((p) => `<option value="${p.id}">${p.name} — ${p.room}</option>`)
      .join("");
    document.getElementById("taskNurse").innerHTML = state.nurses
      .filter((n) => n.status === "active")
      .map((n) => `<option>${n.name}</option>`)
      .join("");

    const doctorOpts = state.doctors.map((d) => `<option>${d.name}</option>`).join("");
    document.getElementById("docDept").innerHTML = state.departments.map((d) => `<option>${d}</option>`).join("");
    document.getElementById("nurDept").innerHTML = state.departments.map((d) => `<option>${d}</option>`).join("");
    document.getElementById("patDoctor").innerHTML = doctorOpts;
    document.getElementById("patNurse").innerHTML = state.nurses.map((n) => `<option>${n.name}</option>`).join("");
  }

  function renderPendingInstructionsList() {
    document.getElementById("pendingInstructionsList").innerHTML =
      state.pendingInstructions
        .map(
          (i) => `
      <div class="data-row" style="grid-template-columns: 1.2fr 1fr 2fr 90px .8fr 130px;">
        <span class="cell-patient" data-label="Patient"><strong>${i.patient}</strong></span>
        <span data-label="From">${i.doctor}</span>
        <span class="cell-instruction" data-label="Instruction">${i.instruction}</span>
        <span data-label="Priority">${priorityBadge(i.priority)}</span>
        <span class="cell-time" data-label="Received">${i.datetime}</span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-primary" data-action="prefill-task" data-id="${i.id}">Assign Nurse</button>
        </span>
      </div>`
        )
        .join("") || `<p style="padding:20px;color:var(--color-muted);font-size:14px;">No instructions waiting for assignment.</p>`;
  }

  function filterTasks(list, filter) {
    if (filter === "all") return list;
    return list.filter((t) => t.status === filter);
  }

  function renderAdminTasks() {
    const sorted = filterTasks(state.tasks, taskFilter);
    document.getElementById("adminTaskList").innerHTML =
      sorted
        .map(
          (t) => `
      <div class="data-row admin-task-row-grid ${t.status === "overdue" ? "is-overdue" : ""}">
        <span class="cell-patient" data-label="Patient"><strong>${t.patient}</strong></span>
        <span data-label="Nurse">${t.nurse}</span>
        <span class="cell-task" data-label="Task">${t.task}</span>
        <span class="cell-time" data-label="Time">${t.time}</span>
        <span data-label="Priority">${priorityBadge(t.priority)}</span>
        <span data-label="Status">${taskStatusBadge(t.status)}</span>
        <span class="cell-room" data-label="Created By">${t.createdBy}</span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-secondary" data-action="reassign-task" data-id="${t.id}">Reassign</button>
        </span>
      </div>`
        )
        .join("") || `<p style="padding:20px;color:var(--color-muted);font-size:14px;">No tasks match this filter.</p>`;
  }

  function handleTaskSubmit(evt) {
    evt.preventDefault();
    const patientId = document.getElementById("taskPatient").value;
    const patient = state.patients.find((p) => p.id === patientId);
    if (!patient) return;

    const task = {
      id: "T" + (state.tasks.length + 1),
      patient: patient.name,
      nurse: document.getElementById("taskNurse").value,
      task: document.getElementById("taskDescription").value.trim(),
      time: document.getElementById("taskTime").value.trim(),
      priority: document.getElementById("taskPriority").value,
      status: "pending",
      createdBy: "Admin — Priya Menon",
      lastUpdate: "Just now",
    };

    // TODO(backend): POST /api/admin/tasks
    //   { patientId, nurseId, task, time, priority, createdBy }
    // This creates the workflow task that appears in the nurse's schedule.
    state.tasks.push(task);
    addAuditLog(`Assigned task "${task.task}" to ${task.nurse}`, patient.name);
    document.getElementById("taskForm").reset();
    document.getElementById("taskPriority").value = "medium";
    populateTaskSelects();
    renderAdminTasks();
    updateSummary();
    showToast(`Task assigned to ${task.nurse} for ${patient.name}.`);
  }

  function handlePrefillTask(instructionId) {
    const instr = state.pendingInstructions.find((i) => i.id === instructionId);
    if (!instr) return;
    const patient = state.patients.find((p) => p.name === instr.patient);
    if (patient) document.getElementById("taskPatient").value = patient.id;
    document.getElementById("taskDescription").value = instr.instruction;
    document.getElementById("taskPriority").value = instr.priority;
    document.getElementById("taskForm").scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`Instruction loaded — choose a nurse and confirm the task.`);
  }

  function handleTaskReassign(taskId) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (!task) return;
    const activeNurses = state.nurses.filter((n) => n.status === "active").map((n) => n.name);
    const currentIndex = activeNurses.indexOf(task.nurse);
    const nextNurse = activeNurses[(currentIndex + 1) % activeNurses.length];
    const prevNurse = task.nurse;
    task.nurse = nextNurse;
    task.lastUpdate = "Just now";
    // TODO(backend): PATCH /api/admin/tasks/:id { nurseId }
    addAuditLog(`Reassigned task "${task.task}" from ${prevNurse} to ${nextNurse}`, task.patient);
    renderAdminTasks();
    showToast(`Task reassigned to ${nextNurse}.`);
  }

  /* -------------------------------------------------------------
     RENDER: MESSAGES / NOTIFICATIONS
  ------------------------------------------------------------- */
  function renderMessages() {
    document.getElementById("messageList").innerHTML = state.messages
      .map(
        (m) => `
      <div class="message-row ${m.unread ? "unread" : ""}">
        <span class="unread-dot" data-hidden="${!m.unread}"></span>
        <div class="avatar" style="width:36px;height:36px;font-size:12px;">${initials(m.contact)}</div>
        <div class="message-body">
          <div class="message-body-top"><strong>${m.contact}</strong><span>${m.time}</span></div>
          <div class="message-preview">${m.preview}</div>
        </div>
      </div>`
      )
      .join("");
  }

  function renderNotifications() {
    document.getElementById("notificationList").innerHTML = state.notifications
      .map(
        (n) => `
      <div class="notification-row ${n.read ? "" : "unread"}">
        <div class="notif-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
        </div>
        <div class="notification-body"><p>${n.text}</p><span>${n.time}</span></div>
      </div>`
      )
      .join("");
    updateSummary();
  }

  /* -------------------------------------------------------------
     RENDER: REPORTS
  ------------------------------------------------------------- */
  function renderReports() {
    const reports = [
      { title: "Daily Task Summary", desc: "Completed vs. pending tasks across all wards today." },
      { title: "Staff Attendance", desc: "Doctor and nurse duty status for the current shift." },
      { title: "Patient Census", desc: "Admissions, discharges and current occupancy." },
      { title: "Handover Compliance", desc: "Shift handovers submitted on time this week." },
    ];
    document.getElementById("reportGrid").innerHTML = reports
      .map(
        (r) => `
      <div class="report-card">
        <div class="report-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M8 13h8M8 17h8M8 9h3"/></svg></div>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <button class="btn btn-xs btn-secondary" data-action="generate-report">Generate</button>
      </div>`
      )
      .join("");

    const deptData = [
      { dept: "General Medicine", pct: 72 },
      { dept: "Surgery", pct: 58 },
      { dept: "Cardiology", pct: 40 },
    ];
    document.getElementById("deptCompletionList").innerHTML = deptData
      .map(
        (d) => `
      <div class="bar-row">
        <span class="bar-row-label">${d.dept}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${d.pct}%;"></div></div>
        <span class="bar-row-pct">${d.pct}%</span>
      </div>`
      )
      .join("");
  }

  /* -------------------------------------------------------------
     RENDER: AUDIT LOGS
  ------------------------------------------------------------- */
  function addAuditLog(action, target) {
    state.auditLogs.unshift({
      id: "A" + (state.auditLogs.length + 1),
      actor: "Priya Menon (Admin)",
      action,
      target,
      datetime: "Just now",
    });
    // TODO(backend): server should write this automatically on the corresponding
    // PATCH/POST endpoints — POST /api/admin/audit-logs is illustrative only.
    if (!document.getElementById("section-audit").hidden) renderAuditLogs();
  }

  function renderAuditLogs(filterText = "") {
    const q = filterText.trim().toLowerCase();
    const list = state.auditLogs.filter(
      (a) => !q || a.actor.toLowerCase().includes(q) || a.action.toLowerCase().includes(q) || a.target.toLowerCase().includes(q)
    );
    document.getElementById("auditList").innerHTML =
      list
        .map(
          (a) => `
      <div class="data-row audit-row-grid">
        <span class="cell-patient" data-label="Actor"><strong>${a.actor}</strong></span>
        <span class="cell-instruction" data-label="Action">${a.action}</span>
        <span data-label="Involving">${a.target}</span>
        <span class="cell-time" data-label="Date/Time">${a.datetime}</span>
      </div>`
        )
        .join("") || `<p style="padding:20px;color:var(--color-muted);font-size:14px;">No audit entries match your search.</p>`;
  }

  /* -------------------------------------------------------------
     HOSPITAL SETTINGS
  ------------------------------------------------------------- */
  function renderDepartmentChips() {
    document.getElementById("departmentChips").innerHTML = state.departments
      .map(
        (d, idx) => `
      <span class="chip">
        ${d}
        <button type="button" data-action="remove-dept" data-idx="${idx}" aria-label="Remove ${d}">&times;</button>
      </span>`
      )
      .join("");
  }

  /* -------------------------------------------------------------
     MODALS
  ------------------------------------------------------------- */
  function openModal(id) {
    document.getElementById(id).classList.add("open");
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove("open");
  }

  function showInviteResult(role, name) {
    const code = generateInviteCode(role);
    document.getElementById("inviteCodeText").textContent = code;
    document.getElementById("inviteModalSub").textContent = `Share this invitation ID with ${name}. It must be used to activate their account.`;
    document.getElementById("copyInviteBtn").dataset.code = code;
    openModal("inviteModalOverlay");
  }

  function handleDoctorFormSubmit(evt) {
    evt.preventDefault();
    const name = document.getElementById("docName").value.trim();
    const email = document.getElementById("docEmail").value.trim();
    const dept = document.getElementById("docDept").value;

    const doctor = {
      id: "SN-DOC-" + Math.floor(1000 + Math.random() * 9000),
      name: name.startsWith("Dr.") ? name : "Dr. " + name,
      dept,
      email,
      status: "active",
      patientsCount: 0,
    };
    // TODO(backend): POST /api/admin/doctors/invite
    //   { name, email, department, permissions } -> returns invitation token
    state.doctors.push(doctor);
    addAuditLog("Added new doctor and generated invitation ID", doctor.name);
    renderDoctors();
    populateTaskSelects();
    updateSummary();
    closeModal("doctorModalOverlay");
    document.getElementById("doctorForm").reset();
    showInviteResult("DOC", doctor.name);
  }

  function handleNurseFormSubmit(evt) {
    evt.preventDefault();
    const name = document.getElementById("nurName").value.trim();
    const email = document.getElementById("nurEmail").value.trim();
    const dept = document.getElementById("nurDept").value;
    const shift = document.getElementById("nurShift").value;

    const nurse = {
      id: "SN-NUR-" + Math.floor(1000 + Math.random() * 9000),
      name,
      dept,
      shift,
      email,
      status: "active",
      patientsCount: 0,
    };
    // TODO(backend): POST /api/admin/nurses/invite
    //   { name, email, department, shift } -> returns invitation token
    state.nurses.push(nurse);
    addAuditLog("Added new nurse and generated invitation ID", nurse.name);
    renderNurses();
    populateTaskSelects();
    updateSummary();
    closeModal("nurseModalOverlay");
    document.getElementById("nurseForm").reset();
    showInviteResult("NUR", nurse.name);
  }

  function handlePatientFormSubmit(evt) {
    evt.preventDefault();
    const patient = {
      id: "P-" + Math.floor(1000 + Math.random() * 9000),
      name: document.getElementById("patName").value.trim(),
      room: document.getElementById("patRoom").value.trim(),
      priority: document.getElementById("patPriority").value,
      doctor: document.getElementById("patDoctor").value,
      nurse: document.getElementById("patNurse").value,
      status: "Admitted",
    };
    // TODO(backend): POST /api/admin/patients
    //   { name, age, room, priority, doctorId, nurseId }
    state.patients.push(patient);
    addAuditLog("Registered new patient", patient.name);
    renderAdminPatients();
    renderAssignments();
    populateTaskSelects();
    updateSummary();
    closeModal("patientModalOverlay");
    document.getElementById("patientForm").reset();
    showToast(`${patient.name} registered and assigned to ${patient.doctor} / ${patient.nurse}.`);
  }

  /* -------------------------------------------------------------
     NAVIGATION
  ------------------------------------------------------------- */
  const sectionMeta = {
    dashboard: { title: "Dashboard", subtitle: "Sunrise Multi-Specialty Hospital — overview." },
    doctors: { title: "Doctors", subtitle: "Manage doctor accounts, departments and permissions." },
    nurses: { title: "Nurses", subtitle: "Manage nurse accounts, departments and shifts." },
    patients: { title: "Patients", subtitle: "Registry of all patients and admission status." },
    assignments: { title: "Assignments", subtitle: "Reassign doctors and nurses across your patient roster." },
    "nurse-schedule": { title: "Nurse Schedule", subtitle: "Shift coverage, patient load and availability." },
    "doctor-schedule": { title: "Doctor Schedule", subtitle: "On-call coverage and shift timing by department." },
    tasks: { title: "Tasks", subtitle: "Create, assign and monitor nurse workflow tasks." },
    messages: { title: "Messages", subtitle: "Secure conversations with doctors and nurses." },
    notifications: { title: "Notifications", subtitle: "Staff, patient and workflow alerts." },
    reports: { title: "Reports", subtitle: "Generate operational summaries for your hospital." },
    audit: { title: "Audit Logs", subtitle: "Full activity history across your hospital workspace." },
    settings: { title: "Hospital Settings", subtitle: "Manage hospital profile, departments and security policies." },
    profile: { title: "Profile", subtitle: "Your account and access details." },
  };

  function goToSection(name) {
    Object.keys(sectionMeta).forEach((key) => {
      const el = document.getElementById("section-" + key);
      if (el) el.hidden = key !== name;
    });
    document.querySelectorAll(".nav-item[data-section]").forEach((a) => {
      a.classList.toggle("active", a.dataset.section === name);
    });
    const meta = sectionMeta[name];
    if (meta) {
      document.getElementById("pageTitle").textContent = meta.title;
      document.getElementById("pageSubtitle").textContent = meta.subtitle;
    }
    if (name === "audit") renderAuditLogs();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeSidebarMobile();
  }

  /* -------------------------------------------------------------
     SIDEBAR (mobile)
  ------------------------------------------------------------- */
  function openSidebarMobile() {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("sidebarOverlay").classList.add("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "true");
  }
  function closeSidebarMobile() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  }

  /* -------------------------------------------------------------
     CLOCK
  ------------------------------------------------------------- */
  function tickClock() {
    const now = new Date();
    document.getElementById("clockText").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  /* -------------------------------------------------------------
     INIT
  ------------------------------------------------------------- */
  function init() {
    populateTaskSelects();
    renderDepartmentChips();
    updateSummary();
    renderPendingInstructionsPreview();
    renderUrgentPatientsList();
    renderDoctors();
    renderNurses();
    renderAdminPatients();
    renderAssignments();
    renderNurseSchedule();
    renderDoctorSchedule();
    renderPendingInstructionsList();
    renderAdminTasks();
    renderMessages();
    renderNotifications();
    renderReports();
    renderAuditLogs();
    tickClock();
    setInterval(tickClock, 30000);

    // Sidebar navigation
    document.querySelectorAll(".nav-item[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        goToSection(link.dataset.section);
      });
    });
    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => goToSection(btn.dataset.goto));
    });

    // Mobile sidebar toggle
    document.getElementById("menuToggle").addEventListener("click", openSidebarMobile);
    document.getElementById("sidebarOverlay").addEventListener("click", closeSidebarMobile);

    // Logout (stub)
    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      // TODO(backend): POST /api/auth/logout then redirect to /login
      showToast("Logging out…");
      setTimeout(() => { window.location.href = "/login"; }, 700);
    });

    // Modal open triggers
    document.getElementById("addDoctorBtn").addEventListener("click", () => openModal("doctorModalOverlay"));
    document.getElementById("addNurseBtn").addEventListener("click", () => openModal("nurseModalOverlay"));
    document.getElementById("registerPatientBtn").addEventListener("click", () => openModal("patientModalOverlay"));

    // Modal close triggers (event delegation)
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
    });
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") document.querySelectorAll(".modal-overlay.open").forEach((o) => closeModal(o.id));
    });

    // Forms
    document.getElementById("doctorForm").addEventListener("submit", handleDoctorFormSubmit);
    document.getElementById("nurseForm").addEventListener("submit", handleNurseFormSubmit);
    document.getElementById("patientForm").addEventListener("submit", handlePatientFormSubmit);
    document.getElementById("taskForm").addEventListener("submit", handleTaskSubmit);
    document.getElementById("hospitalForm").addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO(backend): PATCH /api/admin/hospital
      addAuditLog("Updated hospital profile settings", "Hospital Settings");
      showToast("Hospital profile saved.");
    });
    document.getElementById("departmentForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newDepartment");
      const value = input.value.trim();
      if (!value) return;
      state.departments.push(value);
      // TODO(backend): POST /api/admin/departments
      renderDepartmentChips();
      populateTaskSelects();
      input.value = "";
      showToast(`Department "${value}" added.`);
    });

    // Copy invite code
    document.getElementById("copyInviteBtn").addEventListener("click", (e) => {
      const code = e.target.dataset.code || document.getElementById("inviteCodeText").textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => showToast("Invitation ID copied to clipboard."));
      } else {
        showToast(`Invitation ID: ${code}`);
      }
    });

    // Event delegation: doctor/nurse toggles, task actions, assignment selects, dept remove
    document.body.addEventListener("click", (e) => {
      const removeDept = e.target.closest('[data-action="remove-dept"]');
      if (removeDept) {
        const idx = Number(removeDept.dataset.idx);
        const removed = state.departments.splice(idx, 1);
        renderDepartmentChips();
        populateTaskSelects();
        showToast(`Department "${removed[0]}" removed.`);
        return;
      }
      const prefillBtn = e.target.closest('[data-action="prefill-task"]');
      if (prefillBtn) { handlePrefillTask(prefillBtn.dataset.id); return; }

      const reassignTaskBtn = e.target.closest('[data-action="reassign-task"]');
      if (reassignTaskBtn) { handleTaskReassign(reassignTaskBtn.dataset.id); return; }

      const dischargeBtn = e.target.closest('[data-action="discharge-patient"]');
      if (dischargeBtn) { handleDischargeToggle(dischargeBtn.dataset.id, true); return; }

      const readmitBtn = e.target.closest('[data-action="readmit-patient"]');
      if (readmitBtn) { handleDischargeToggle(readmitBtn.dataset.id, false); return; }

      const viewDoctorPatients = e.target.closest('[data-action="view-doctor-patients"]');
      if (viewDoctorPatients) { goToSection("patients"); return; }

      const viewNursePatients = e.target.closest('[data-action="view-nurse-patients"]');
      if (viewNursePatients) { goToSection("patients"); return; }

      const generateReportBtn = e.target.closest('[data-action="generate-report"]');
      if (generateReportBtn) { showToast("Report generated — ready to download."); return; }
    });

    document.body.addEventListener("change", (e) => {
      const doctorToggle = e.target.closest('[data-action="toggle-doctor"]');
      if (doctorToggle) { handleDoctorToggle(doctorToggle.dataset.id); return; }

      const nurseToggle = e.target.closest('[data-action="toggle-nurse"]');
      if (nurseToggle) { handleNurseToggle(nurseToggle.dataset.id); return; }

      const reassignDoctor = e.target.closest('[data-action="reassign-doctor"]');
      if (reassignDoctor) { handleReassign(reassignDoctor.dataset.id, "doctor", reassignDoctor.value); return; }

      const reassignNurse = e.target.closest('[data-action="reassign-nurse"]');
      if (reassignNurse) { handleReassign(reassignNurse.dataset.id, "nurse", reassignNurse.value); return; }
    });

    // Task filters
    document.getElementById("taskFilterGroup").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      document.querySelectorAll("#taskFilterGroup .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      taskFilter = chip.dataset.filter;
      renderAdminTasks();
    });

    // Assignment search
    document.getElementById("assignmentSearch").addEventListener("input", (e) => renderAssignments(e.target.value));

    // Audit search
    document.getElementById("auditSearch").addEventListener("input", (e) => renderAuditLogs(e.target.value));

    // Mark all notifications read
    document.getElementById("markAllReadBtn").addEventListener("click", () => {
      state.notifications.forEach((n) => (n.read = true));
      // TODO(backend): PATCH /api/admin/notifications/read-all
      renderNotifications();
      showToast("All notifications marked as read.");
    });

    // Top notification bell
    document.getElementById("topNotifBtn").addEventListener("click", () => goToSection("notifications"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
