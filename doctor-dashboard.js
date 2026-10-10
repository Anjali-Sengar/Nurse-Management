/* =====================================================================
   Smart Nurse Management System — Doctor Dashboard
   Vanilla JS only. Mock data below stands in for GET/POST calls to an
   Express + MongoDB backend (see TODO markers for integration points).
===================================================================== */
(function () {
  "use strict";

  /* -------------------------------------------------------------
     MOCK DATA
     TODO(backend): replace with fetch() calls, e.g.
       GET /api/doctor/patients
       GET /api/doctor/patients/:id
       POST /api/doctor/prescriptions
       POST /api/doctor/instructions
       GET /api/doctor/nurse-updates
  ------------------------------------------------------------- */
  const state = {
    patients: [
      {
        id: "P-1042", name: "Anita Sharma", room: "B-204", age: 58, gender: "Female",
        condition: "Stable, post-surgical recovery", priority: "medium", lastUpdate: "12 min ago",
        basic: { bloodGroup: "B+", admitted: "12 Aug 2026", contact: "+91 98XXX XXXX1", emergency: "Rohit Sharma (Son) · +91 98XXX XXXX2" },
        history: ["Hypertension, diagnosed 2019", "Appendectomy, 2011", "No known drug allergies"],
        doctorNotes: [
          { date: "Today, 08:10", note: "Recovering well post-op. Continue current monitoring plan." },
          { date: "Yesterday, 17:30", note: "Mild dizziness reported by nurse — advised extra hydration and monitoring." },
        ],
        observations: [
          { date: "Today, 09:00", nurse: "Nurse Riya Kapoor", note: "BP 128/82, temperature normal. Patient resting comfortably." },
          { date: "Yesterday, 20:15", nurse: "Nurse Alok Sen", note: "Mild dizziness around evening rounds, resolved after rest." },
        ],
        prescriptions: [
          { medicine: "Paracetamol 500mg", dosage: "500mg", frequency: "As needed (PRN)", times: "On fever", duration: "3 days", date: "Today" },
        ],
        documents: [
          { name: "Post-op discharge summary.pdf", type: "Report", date: "12 Aug 2026" },
          { name: "Blood work — CBC.pdf", type: "Lab", date: "13 Aug 2026" },
        ],
        activity: [
          { date: "Today, 09:00", event: "Nurse observation logged — vitals stable." },
          { date: "Today, 08:10", event: "Doctor note added." },
          { date: "Yesterday, 17:30", event: "Instruction sent: monitor BP every 4 hours." },
          { date: "12 Aug 2026", event: "Admitted — post-surgical recovery." },
        ],
      },
      {
        id: "P-1043", name: "Ramesh Iyer", room: "B-207", age: 64, gender: "Male",
        condition: "Diabetic, under observation", priority: "high", lastUpdate: "28 min ago",
        basic: { bloodGroup: "O+", admitted: "10 Aug 2026", contact: "+91 98XXX XXXX3", emergency: "Meena Iyer (Wife) · +91 98XXX XXXX4" },
        history: ["Type 2 Diabetes, diagnosed 2015", "Coronary bypass, 2020", "Allergic to penicillin"],
        doctorNotes: [
          { date: "Today, 07:50", note: "Glucose trending high this week. Adjusting insulin schedule — monitor closely." },
        ],
        observations: [
          { date: "Today, 08:30", nurse: "Nurse Riya Kapoor", note: "Fasting glucose 168 mg/dL. Patient alert, no distress." },
        ],
        prescriptions: [
          { medicine: "Metformin 500mg", dosage: "500mg", frequency: "Twice daily", times: "08:00, 20:00", duration: "Ongoing", date: "10 Aug 2026" },
          { medicine: "Insulin (sliding scale)", dosage: "As charted", frequency: "Before meals", times: "08:00, 12:30, 19:00", duration: "Ongoing", date: "10 Aug 2026" },
        ],
        documents: [{ name: "HbA1c report.pdf", type: "Lab", date: "9 Aug 2026" }],
        activity: [
          { date: "Today, 08:30", event: "Nurse observation logged — glucose reading recorded." },
          { date: "Today, 07:50", event: "Doctor note added — insulin schedule adjusted." },
        ],
      },
      {
        id: "P-1044", name: "Fatima Sheikh", room: "B-210", age: 41, gender: "Female",
        condition: "Recovering — surgical wound care", priority: "low", lastUpdate: "1 hr ago",
        basic: { bloodGroup: "A+", admitted: "14 Aug 2026", contact: "+91 98XXX XXXX5", emergency: "Imran Sheikh (Husband) · +91 98XXX XXXX6" },
        history: ["No chronic conditions on record", "First surgical procedure"],
        doctorNotes: [{ date: "Yesterday, 18:20", note: "Wound healing on schedule. Continue daily dressing changes." }],
        observations: [{ date: "Today, 09:00", nurse: "Nurse Riya Kapoor", note: "Wound clean, no signs of infection. Dressing changed." }],
        prescriptions: [{ medicine: "Amoxicillin 250mg", dosage: "250mg", frequency: "Every 8 hours", times: "08:00, 16:00, 00:00", duration: "7 days", date: "14 Aug 2026" }],
        documents: [{ name: "Surgical notes.pdf", type: "Report", date: "14 Aug 2026" }],
        activity: [{ date: "Today, 09:00", event: "Wound dressing changed and logged." }],
      },
      {
        id: "P-1046", name: "Sunita Rao", room: "B-212", age: 52, gender: "Female",
        condition: "Pre-operative, scheduled for surgery", priority: "high", lastUpdate: "5 min ago",
        basic: { bloodGroup: "AB+", admitted: "15 Aug 2026", contact: "+91 98XXX XXXX7", emergency: "Kiran Rao (Daughter) · +91 98XXX XXXX8" },
        history: ["Hypothyroidism, managed", "No known drug allergies"],
        doctorNotes: [{ date: "Today, 07:30", note: "Confirm consent form and NPO status before surgery scheduled at 11:00 AM." }],
        observations: [{ date: "Today, 07:00", nurse: "Nurse Riya Kapoor", note: "Patient anxious about procedure — reassured. Vitals stable." }],
        prescriptions: [],
        documents: [{ name: "Pre-op assessment.pdf", type: "Report", date: "15 Aug 2026" }],
        activity: [
          { date: "Today, 07:30", event: "Instruction sent: confirm pre-op checklist." },
          { date: "Today, 07:00", event: "Nurse observation logged — patient anxious, reassured." },
        ],
      },
    ],

    instructions: [
      { id: "I1", patient: "Anita Sharma", instruction: "Monitor blood pressure every 4 hours. Report if systolic > 150.", priority: "high", datetime: "Today, 07:45", status: "pending" },
      { id: "I2", patient: "Sunita Rao", instruction: "Confirm pre-op checklist and consent form before 11:00 AM.", priority: "high", datetime: "Today, 07:30", status: "acknowledged" },
      { id: "I3", patient: "Fatima Sheikh", instruction: "Redress surgical wound daily and watch for infection signs.", priority: "medium", datetime: "Yesterday, 18:20", status: "acknowledged" },
    ],

    nurseUpdates: [
      { patient: "Sunita Rao", time: "Today, 07:00", condition: "Stable, anxious", observations: "Patient anxious about upcoming procedure.", note: "Reassured patient, explained procedure steps.", taskStatus: "completed" },
      { patient: "Ramesh Iyer", time: "Today, 08:30", condition: "Stable", observations: "Fasting glucose 168 mg/dL.", note: "Recorded and flagged for doctor review.", taskStatus: "completed" },
      { patient: "Anita Sharma", time: "Today, 09:00", condition: "Stable", observations: "BP 128/82, temperature normal.", note: "Resting comfortably, no complaints.", taskStatus: "completed" },
      { patient: "Fatima Sheikh", time: "Today, 09:00", condition: "Improving", observations: "Wound clean, no infection signs.", note: "Dressing changed as scheduled.", taskStatus: "completed" },
      { patient: "Ramesh Iyer", time: "Today, 12:30", condition: "Pending check", observations: "Pending post-lunch glucose reading.", note: "Awaiting nurse update.", taskStatus: "pending" },
    ],

    messages: [
      { id: "MSG1", contact: "Nurse Riya Kapoor", preview: "Anita Sharma's BP recheck done — 128/82, within range.", time: "09:12", unread: true },
      { id: "MSG2", contact: "Ward Admin — Priya Menon", preview: "Sunita Rao's OT slot confirmed for 11:00 AM.", time: "08:40", unread: true },
      { id: "MSG3", contact: "Nurse Alok Sen", preview: "Evening handover notes are ready for your review.", time: "Yesterday", unread: false },
      { id: "MSG4", contact: "Dr. Neha Kulkarni", preview: "Can you review Fatima Sheikh's wound photos when free?", time: "Yesterday", unread: false },
    ],

    reports: [
      { name: "Post-op discharge summary.pdf", patient: "Anita Sharma", type: "Report", date: "12 Aug 2026" },
      { name: "Blood work — CBC.pdf", patient: "Anita Sharma", type: "Lab", date: "13 Aug 2026" },
      { name: "HbA1c report.pdf", patient: "Ramesh Iyer", type: "Lab", date: "9 Aug 2026" },
      { name: "Surgical notes.pdf", patient: "Fatima Sheikh", type: "Report", date: "14 Aug 2026" },
      { name: "Pre-op assessment.pdf", patient: "Sunita Rao", type: "Report", date: "15 Aug 2026" },
    ],

    notifications: [
      { id: "N1", text: "Nurse Riya Kapoor logged a new observation for Ramesh Iyer.", time: "18 min ago", read: false },
      { id: "N2", text: "Sunita Rao's pre-op checklist was acknowledged by the nursing team.", time: "40 min ago", read: false },
      { id: "N3", text: "New lab report uploaded for Anita Sharma.", time: "2 hr ago", read: false },
      { id: "N4", text: "Shift handover completed for Ward B — morning shift.", time: "4 hr ago", read: true },
    ],

    appointmentsToday: 3,
  };

  let recordsFilter = "all";
  let currentDrawerPatientId = null;

  /* -------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------- */
  function priorityBadge(priority) {
    const label = priority.charAt(0).toUpperCase() + priority.slice(1);
    return `<span class="badge badge-${priority}">${label}</span>`;
  }

  function instrStatusBadge(status) {
    const map = { pending: ["Pending", "pending"], acknowledged: ["Acknowledged", "acknowledged"] };
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

  function findPatient(idOrName) {
    return state.patients.find((p) => p.id === idOrName || p.name === idOrName);
  }

  function initials(name) {
    return name
      .replace(/^(Dr\.|Nurse|Ward Admin —)\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  /* -------------------------------------------------------------
     SUMMARY
  ------------------------------------------------------------- */
  function updateSummary() {
    document.getElementById("statAssigned").textContent = state.patients.length;
    document.getElementById("statAttention").textContent = state.patients.filter((p) => p.priority === "high").length;
    document.getElementById("statPendingUpdates").textContent = state.nurseUpdates.filter((u) => u.taskStatus === "pending").length;
    document.getElementById("statAppointments").textContent = state.appointmentsToday;

    const unreadNotifs = state.notifications.filter((n) => !n.read).length;
    const navNotifCount = document.getElementById("navNotifCount");
    navNotifCount.textContent = unreadNotifs;
    navNotifCount.dataset.zero = unreadNotifs === 0;
    document.getElementById("topNotifDot").dataset.hidden = unreadNotifs === 0;

    const pendingUpdates = state.nurseUpdates.filter((u) => u.taskStatus === "pending").length;
    const navUpdateCount = document.getElementById("navUpdateCount");
    navUpdateCount.textContent = pendingUpdates;
    navUpdateCount.dataset.zero = pendingUpdates === 0;
  }

  /* -------------------------------------------------------------
     DASHBOARD OVERVIEW
  ------------------------------------------------------------- */
  function renderAttentionList() {
    const sorted = [...state.patients].sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });
    document.getElementById("attentionList").innerHTML = sorted
      .slice(0, 5)
      .map(
        (p) => `
      <div class="data-row" style="grid-template-columns: 1.4fr .9fr 1.3fr 90px;">
        <span class="cell-patient" data-label="Patient"><strong>${p.name}</strong><span>${p.room} · Age ${p.age}</span></span>
        <span data-label="Priority">${priorityBadge(p.priority)}</span>
        <span class="cell-task" data-label="Condition">${p.condition}</span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-secondary" data-action="view-patient" data-id="${p.id}">View</button>
        </span>
      </div>`
      )
      .join("");
  }

  function renderDashUpdates() {
    const recent = [...state.nurseUpdates].slice(-4).reverse();
    document.getElementById("dashUpdatesList").innerHTML = recent.map(renderUpdateCard).join("");
  }

  /* -------------------------------------------------------------
     RENDER: UPDATE CARD (shared by dashboard + full updates section)
  ------------------------------------------------------------- */
  function renderUpdateCard(u) {
    const statusBadge =
      u.taskStatus === "completed"
        ? `<span class="badge badge-completed">Completed</span>`
        : `<span class="badge badge-pending">Pending</span>`;
    return `
      <div class="update-card">
        <div class="update-card-top">
          <strong>${u.patient}</strong>
          <span>${u.time}</span>
        </div>
        <p class="update-obs"><strong style="color:var(--color-navy);">Observation:</strong> ${u.observations}</p>
        <p class="update-note"><strong style="color:var(--color-navy);">Nurse note:</strong> ${u.note}</p>
        <div class="update-card-foot">
          <span class="badge badge-progress">${u.condition}</span>
          ${statusBadge}
        </div>
      </div>`;
  }

  function renderFullUpdates() {
    document.getElementById("updatesList").innerHTML = [...state.nurseUpdates].reverse().map(renderUpdateCard).join("");
  }

  /* -------------------------------------------------------------
     RENDER: MY PATIENTS
  ------------------------------------------------------------- */
  function renderPatients(filterText = "") {
    const q = filterText.trim().toLowerCase();
    const list = state.patients.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.room.toLowerCase().includes(q)
    );
    document.getElementById("patientList").innerHTML =
      list
        .map(
          (p) => `
      <div class="data-row patient-row-grid" data-patient-id="${p.id}">
        <span class="cell-patient" data-label="Patient"><strong>${p.name}</strong><span>${p.id}</span></span>
        <span class="cell-room" data-label="Room/Bed">${p.room}</span>
        <span data-label="Age">${p.age}</span>
        <span class="cell-task" data-label="Condition / Status">${p.condition}</span>
        <span class="cell-room" data-label="Last Update">${p.lastUpdate}</span>
        <span data-label="Priority">${priorityBadge(p.priority)}</span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-primary" data-action="view-patient" data-id="${p.id}">View Patient</button>
        </span>
      </div>`
        )
        .join("") || `<p style="padding:20px;color:var(--color-muted);font-size:14px;">No patients match your search.</p>`;
  }

  /* -------------------------------------------------------------
     RENDER: PATIENT RECORDS
  ------------------------------------------------------------- */
  function conditionLabel(p) {
    if (p.priority === "high") return "Critical";
    if (p.priority === "medium") return "Serious";
    return "Stable";
  }

  function renderRecords() {
    const list = state.patients.filter((p) => recordsFilter === "all" || conditionLabel(p) === recordsFilter);
    document.getElementById("recordGrid").innerHTML =
      list
        .map(
          (p) => `
      <article class="record-card">
        <div class="record-card-head">
          <div>
            <h3>${p.name}</h3>
            <span class="patient-id">${p.id} · ${p.room}</span>
          </div>
          ${priorityBadge(p.priority)}
        </div>
        <div class="record-card-body">
          <div><strong>Condition:</strong> ${p.condition}</div>
          <div><strong>History entries:</strong> ${p.history.length}</div>
          <div><strong>Documents:</strong> ${p.documents.length}</div>
        </div>
        <div class="record-card-foot">
          <span class="badge badge-progress">${conditionLabel(p)}</span>
          <button class="btn btn-xs btn-secondary" data-action="view-patient" data-id="${p.id}">Open Record</button>
        </div>
      </article>`
        )
        .join("") || `<p style="color:var(--color-muted);font-size:14px;">No records match this filter.</p>`;
  }

  /* -------------------------------------------------------------
     RENDER: PRESCRIPTIONS
  ------------------------------------------------------------- */
  function populatePatientSelects() {
    const options = state.patients.map((p) => `<option value="${p.id}">${p.name} — ${p.room}</option>`).join("");
    document.getElementById("rxPatient").innerHTML = options;
    document.getElementById("instrPatient").innerHTML = options;
  }

  function renderPrescriptions() {
    const rows = [];
    state.patients.forEach((p) => {
      p.prescriptions.forEach((rx) => {
        rows.push({ ...rx, patient: p.name });
      });
    });
    document.getElementById("prescriptionList").innerHTML =
      rows
        .map(
          (rx) => `
      <div class="data-row rx-row-grid">
        <span data-label="Medicine"><strong>${rx.medicine}</strong></span>
        <span data-label="Patient">${rx.patient}</span>
        <span data-label="Dosage / Frequency">${rx.dosage} · ${rx.frequency}</span>
        <span class="cell-room" data-label="Scheduled Times">${rx.times}</span>
        <span data-label="Duration">${rx.duration}</span>
      </div>`
        )
        .join("") || `<p style="padding:20px;color:var(--color-muted);font-size:14px;">No prescriptions issued yet.</p>`;
  }

  function handlePrescriptionSubmit(evt) {
    evt.preventDefault();
    const patientId = document.getElementById("rxPatient").value;
    const patient = findPatient(patientId);
    if (!patient) return;

    const rx = {
      medicine: document.getElementById("rxMedicine").value.trim(),
      dosage: document.getElementById("rxDosage").value.trim(),
      frequency: document.getElementById("rxFrequency").value,
      times: document.getElementById("rxTimes").value.trim(),
      duration: document.getElementById("rxDuration").value.trim(),
      instructions: document.getElementById("rxInstructions").value.trim(),
      date: "Today",
    };

    // TODO(backend): POST /api/doctor/prescriptions
    //   { patientId, medicine, dosage, frequency, times, duration, instructions, prescribedBy }
    // Stored as a doctor-approved record only — never generated or altered by the system.
    patient.prescriptions.push(rx);
    patient.activity.unshift({ date: "Just now", event: `Prescription added: ${rx.medicine} (${rx.dosage}).` });

    document.getElementById("prescriptionForm").reset();
    populatePatientSelects();
    renderPrescriptions();
    if (currentDrawerPatientId === patient.id) renderDrawerContent(patient);
    showToast(`Prescription added for ${patient.name}.`);
  }

  /* -------------------------------------------------------------
     RENDER: DOCTOR INSTRUCTIONS
  ------------------------------------------------------------- */
  function renderInstructions() {
    const sorted = [...state.instructions].reverse();
    document.getElementById("instructionList").innerHTML = sorted
      .map(
        (i) => `
      <div class="data-row instr-row-grid">
        <span data-label="Patient"><strong>${i.patient}</strong></span>
        <span class="cell-instruction" data-label="Instruction">${i.instruction}</span>
        <span class="cell-time" data-label="Date/Time">${i.datetime}</span>
        <span data-label="Priority">${priorityBadge(i.priority)}</span>
        <span data-label="Status">${instrStatusBadge(i.status)}</span>
      </div>`
      )
      .join("");
  }

  function handleInstructionSubmit(evt) {
    evt.preventDefault();
    const patientId = document.getElementById("instrPatient").value;
    const patient = findPatient(patientId);
    if (!patient) return;

    const fileInput = document.getElementById("instrAttachment");
    const fileName = fileInput.files && fileInput.files[0] ? fileInput.files[0].name : null;

    const instruction = {
      id: "I" + (state.instructions.length + 1),
      patient: patient.name,
      instruction: document.getElementById("instrText").value.trim(),
      priority: document.getElementById("instrPriority").value,
      datetime: "Today, just now",
      status: "pending",
      notes: document.getElementById("instrNotes").value.trim(),
      attachment: fileName,
    };

    // TODO(backend): POST /api/doctor/instructions (multipart/form-data if attachment present)
    //   { patientId, instruction, priority, notes, attachment, issuedBy }
    // This creates a workflow task for the assigned nurse — it does not modify
    // the patient's diagnosis, medication, or treatment plan directly.
    state.instructions.push(instruction);
    patient.activity.unshift({ date: "Just now", event: `Instruction sent: "${instruction.instruction.slice(0, 60)}${instruction.instruction.length > 60 ? "…" : ""}"` });

    document.getElementById("instructionForm").reset();
    document.getElementById("instrPriority").value = "medium";
    renderInstructions();
    if (currentDrawerPatientId === patient.id) renderDrawerContent(patient);
    showToast(`Instruction sent for ${patient.name}${fileName ? " with attachment" : ""}.`);
  }

  /* -------------------------------------------------------------
     RENDER: MESSAGES
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

  /* -------------------------------------------------------------
     RENDER: REPORTS / DOCUMENTS
  ------------------------------------------------------------- */
  function renderReports() {
    document.getElementById("reportsList").innerHTML = state.reports
      .map(
        (r) => `
      <div class="data-row doc-row-grid">
        <span data-label="Document"><strong>${r.name}</strong></span>
        <span data-label="Patient">${r.patient}</span>
        <span data-label="Type">${r.type}</span>
        <span class="cell-room" data-label="Uploaded">${r.date}</span>
        <span class="row-action" data-label="">
          <button class="btn btn-xs btn-secondary" data-action="view-report">View</button>
        </span>
      </div>`
      )
      .join("");
  }

  /* -------------------------------------------------------------
     RENDER: NOTIFICATIONS
  ------------------------------------------------------------- */
  function renderNotifications() {
    document.getElementById("notificationList").innerHTML = state.notifications
      .map(
        (n) => `
      <div class="notification-row ${n.read ? "" : "unread"}">
        <div class="notif-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
        </div>
        <div class="notification-body">
          <p>${n.text}</p>
          <span>${n.time}</span>
        </div>
      </div>`
      )
      .join("");
    updateSummary();
  }

  /* -------------------------------------------------------------
     PATIENT PROFILE DRAWER
  ------------------------------------------------------------- */
  function openDrawer(patientId) {
    const patient = findPatient(patientId);
    if (!patient) return;
    currentDrawerPatientId = patient.id;

    document.getElementById("drawerPatientId").textContent = patient.id;
    document.getElementById("drawerPatientName").textContent = patient.name;
    document.getElementById("drawerPatientMeta").textContent = `${patient.room} · Age ${patient.age} · ${patient.condition}`;

    renderDrawerContent(patient);
    switchDrawerTab("basic");
    document.getElementById("drawerOverlay").classList.add("open");

    // TODO(backend): log this access — GET /api/doctor/patients/:id triggers an audit entry server-side.
  }

  function closeDrawer() {
    document.getElementById("drawerOverlay").classList.remove("open");
    currentDrawerPatientId = null;
  }

  function renderDrawerContent(patient) {
    // Basic info
    document.getElementById("tab-basic").innerHTML = `
      <div class="info-grid">
        <div><span>Full Name</span><strong>${patient.name}</strong></div>
        <div><span>Patient ID</span><strong>${patient.id}</strong></div>
        <div><span>Age / Gender</span><strong>${patient.age} · ${patient.gender}</strong></div>
        <div><span>Room / Bed</span><strong>${patient.room}</strong></div>
        <div><span>Blood Group</span><strong>${patient.basic.bloodGroup}</strong></div>
        <div><span>Admitted</span><strong>${patient.basic.admitted}</strong></div>
        <div><span>Contact</span><strong>${patient.basic.contact}</strong></div>
        <div><span>Emergency Contact</span><strong>${patient.basic.emergency}</strong></div>
      </div>`;

    // Medical history
    document.getElementById("tab-history").innerHTML = patient.history.length
      ? `<ul class="handover-list">${patient.history.map((h) => `<li>${h}</li>`).join("")}</ul>`
      : `<p style="color:var(--color-muted);font-size:13.5px;">No medical history on record.</p>`;

    // Doctor notes
    document.getElementById("tab-notes").innerHTML = patient.doctorNotes.length
      ? patient.doctorNotes
          .map(
            (n) => `<div class="entry-card"><div class="entry-card-top"><strong>Doctor note</strong><span>${n.date}</span></div><p>${n.note}</p></div>`
          )
          .join("")
      : `<p style="color:var(--color-muted);font-size:13.5px;">No doctor notes yet.</p>`;

    // Nurse observations
    document.getElementById("tab-observations").innerHTML = patient.observations.length
      ? patient.observations
          .map(
            (o) => `<div class="entry-card"><div class="entry-card-top"><strong>${o.nurse}</strong><span>${o.date}</span></div><p>${o.note}</p></div>`
          )
          .join("")
      : `<p style="color:var(--color-muted);font-size:13.5px;">No nurse observations yet.</p>`;

    // Prescriptions
    document.getElementById("tab-prescriptions").innerHTML = patient.prescriptions.length
      ? patient.prescriptions
          .map(
            (rx) => `
        <div class="entry-card">
          <div class="entry-card-top"><strong>${rx.medicine}</strong><span>${rx.date}</span></div>
          <p>${rx.dosage} · ${rx.frequency} · ${rx.times} · ${rx.duration}${rx.instructions ? ` — ${rx.instructions}` : ""}</p>
        </div>`
          )
          .join("")
      : `<p style="color:var(--color-muted);font-size:13.5px;">No prescriptions on record.</p>`;

    // Documents
    document.getElementById("tab-documents").innerHTML = patient.documents.length
      ? patient.documents
          .map(
            (d) => `
        <div class="doc-row">
          <div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>
          <div class="doc-meta"><strong>${d.name}</strong><span>${d.type} · ${d.date}</span></div>
        </div>`
          )
          .join("")
      : `<p style="color:var(--color-muted);font-size:13.5px;">No documents uploaded yet.</p>`;

    // Activity timeline
    document.getElementById("tab-activity").innerHTML = `
      <div class="timeline-simple">
        ${patient.activity
          .map(
            (a) => `
          <div class="timeline-simple-item">
            <span class="timeline-simple-dot"></span>
            <div class="timeline-simple-content">
              <span>${a.date}</span>
              <p>${a.event}</p>
            </div>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function switchDrawerTab(tabName) {
    document.querySelectorAll(".drawer-tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === tabName));
    document.querySelectorAll(".drawer-panel").forEach((p) => p.classList.toggle("active", p.id === "tab-" + tabName));
  }

  /* -------------------------------------------------------------
     NAVIGATION
  ------------------------------------------------------------- */
  const sectionMeta = {
    dashboard: { title: "Dashboard", subtitle: "An overview of your assigned patients today." },
    patients: { title: "My Patients", subtitle: "Patients currently authorized to your care." },
    records: { title: "Patient Records", subtitle: "Search full medical records, history and documents." },
    prescriptions: { title: "Prescriptions", subtitle: "Create and review patient prescriptions." },
    instructions: { title: "Doctor Instructions", subtitle: "Send and track instructions to the nursing team." },
    updates: { title: "Nurse Updates", subtitle: "Observations and task progress from your nursing team." },
    messages: { title: "Messages", subtitle: "Secure conversations with nurses and hospital admin." },
    reports: { title: "Reports / Documents", subtitle: "Lab reports, scans and referral letters." },
    notifications: { title: "Notifications", subtitle: "Recent updates relevant to your patients." },
    profile: { title: "Profile", subtitle: "Your account and hospital details." },
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
    populatePatientSelects();
    updateSummary();
    renderAttentionList();
    renderDashUpdates();
    renderPatients();
    renderRecords();
    renderPrescriptions();
    renderInstructions();
    renderFullUpdates();
    renderMessages();
    renderReports();
    renderNotifications();
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
      setTimeout(() => {
        window.location.href = "/login";
      }, 700);
    });

    // View Patient buttons (event delegation across sections)
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest('[data-action="view-patient"]');
      if (btn) openDrawer(btn.dataset.id);
    });

    // Patient list row click also opens drawer
    document.getElementById("patientList").addEventListener("click", (e) => {
      const row = e.target.closest(".data-row[data-patient-id]");
      if (row && !e.target.closest("button")) openDrawer(row.dataset.patientId);
    });

    // Patient search
    document.getElementById("patientSearch").addEventListener("input", (e) => renderPatients(e.target.value));

    // Records filter chips
    document.getElementById("recordsFilterGroup").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      document.querySelectorAll("#recordsFilterGroup .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      recordsFilter = chip.dataset.filter;
      renderRecords();
    });

    // Forms
    document.getElementById("prescriptionForm").addEventListener("submit", handlePrescriptionSubmit);
    document.getElementById("instructionForm").addEventListener("submit", handleInstructionSubmit);

    // Quick instruction button (topbar)
    document.getElementById("quickInstructionBtn").addEventListener("click", () => goToSection("instructions"));

    // Mark all notifications read
    document.getElementById("markAllReadBtn").addEventListener("click", () => {
      state.notifications.forEach((n) => (n.read = true));
      // TODO(backend): PATCH /api/doctor/notifications/read-all
      renderNotifications();
      showToast("All notifications marked as read.");
    });

    // Drawer close + tabs + footer actions
    document.getElementById("drawerClose").addEventListener("click", closeDrawer);
    document.getElementById("drawerOverlay").addEventListener("click", (e) => {
      if (e.target.id === "drawerOverlay") closeDrawer();
    });
    document.getElementById("drawerTabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".drawer-tab");
      if (tab) switchDrawerTab(tab.dataset.tab);
    });
    document.querySelectorAll("[data-drawer-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const patientId = currentDrawerPatientId;
        closeDrawer();
        if (btn.dataset.drawerAction === "instruction") {
          goToSection("instructions");
          if (patientId) document.getElementById("instrPatient").value = patientId;
        } else if (btn.dataset.drawerAction === "prescription") {
          goToSection("prescriptions");
          if (patientId) document.getElementById("rxPatient").value = patientId;
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });

    // Top notification bell -> jump to notifications section
    document.getElementById("topNotifBtn").addEventListener("click", () => goToSection("notifications"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
