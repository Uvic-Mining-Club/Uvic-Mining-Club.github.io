# Context Documentation for Project Page

## 15 kV Switchgear

Our team is now developing an enhanced automated fault detection system tailored explicitly for high-voltage (15kV) switchgear operating under some of the most challenging environmental conditions—dusty, hot, and humid mine sites. This upgrade builds upon our Motor Control Centers (MCCs) design principles by integrating more robust components suited to harsher conditions.

Like an MCC consolidates control for various motors, our upgraded switchgear setup will centrally manage and protect multiple high-voltage feeds essential for large-scale industrial processes. To prevent potential failures before they occur, we will employ infrared cameras to continuously scan for unusual temperature rises—“hot spotting”—within the equipment. By detecting these thermal anomalies early, our system can issue timely alerts, enabling technicians to proactively investigate and address the underlying issues.

This predictive maintenance approach aims to enhance uptime and safety, ensuring that mining operations can continue running for extended periods without unexpected outages. The result is a more reliable electrical backbone optimized for the demanding conditions often found in today’s mining environments.

## Motor Control Center

An MCC (Motor Control Center) bank is a central hub for controlling multiple electric motors in big machines or industrial systems. Think of it as a big cabinet with switches and controls that help turn motors on and off, adjust their speed, and protect them from damage (like overheating or electrical surges).

It organizes everything neatly in one place, making it easier to manage and maintain all the motors in a factory, building, or other extensive system. If something goes wrong, the MCC bank helps quickly locate and fix the issue. It's critical equipment to keep operations running smoothly and safely.

Our team is developing an automated fault detection system for Motor Control Centers (MCCs). The goal is to identify potential issues before they escalate into actual faults, allowing electricians to inspect and resolve problems proactively. This early detection will help prevent equipment failures and ensure smoother, safer operations.

## Images to used

![MCC Bank](images/project/MCC.jpg)
_Caption: An example of a Motor Control Center (MCC) bank, which houses multiple
motor control units in a centralized cabinet._
![15kV Switchgear](images/project/SwitchGear.jpg)

# Project Requirements

# UVic Mining Club Requirements Document

## Introduction / Project Overview

The purpose of this project is to design and develop a preventive maintenance system for Motor Control Center (MCC) units. The system will enable early detection of thermal hotspots (referred to as “spotting”) on the internal wiring of 600V MCC units. By identifying anomalies before failure occurs, this solution aims to improve equipment reliability, extend asset lifespan, and reduce downtime.

## Table of Contents

- [Scope](#scope)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Assumptions](#assumptions)
- [Constraints](#constraints)
- [References](#references)

## Scope

### In-Scope

- Hardware configuration for MCC unit monitoring
- Thermal or infrared camera integration
- Protective casing and secure mounting system
- Power supply unit (capable of stepping up or down as needed)
- One or more output interfaces (wired or wireless communication)
- Image processing and hotspot detection functionality

### Out-of-Scope

- Automated or reactionary control measures (e.g., shutting down MCC units)
- User-facing graphical display or GUI software
- Not designed for high-pressure jets or long submersion

## Functional Requirements

The system shall:

1. Detect thermal hotspots (“spotting”) on 600V MCC unit wiring.
   - _Spotting is defined as wiring that exceeds normal operating temperature thresholds, typically caused by degraded insulation or excessive current flow._
2. Capture and process thermal images using an integrated or external camera.
3. Log all detected anomalies with timestamp and location metadata.
4. Transmit detection reports and/or export captured images to a remote access terminal for manual inspection.
5. Provide at least one form of output communication (e.g., USB, Ethernet, or wireless).
6. Allow authorized users to configure detection thresholds and reporting intervals.
7. Continue operation under normal MCC environmental conditions (temperature, dust, vibration).
8. IP67 rated:
   - Complete protection against dust.
   - No ingress of dust; full contact protection.
   - Protected against immersion in water up to 1 meter depth for up to 30 minutes.

## Non-Functional Requirements

The system shall meet the following quality attributes:

1. **Performance**

   - Image processing and hotspot detection shall occur within 2 seconds of image capture.
   - Detection accuracy shall be ≥ 95% when tested under controlled hotspot simulation.

2. **Reliability and Availability**

   - System uptime shall be ≥ 99% during continuous operation.
   - Mean Time Between Failures (MTBF) shall meet or exceed 12 months.

3. **Power Efficiency**

   - The system shall consume less than 75W under normal operating conditions.
   - The system shall support low-power standby mode when not actively monitoring.

4. **Compliance and Standards**

   - The system shall comply with relevant IEEE, IEC, and CSA standards for electrical safety and monitoring equipment.
   - All data transmission shall comply with applicable cybersecurity best practices.

5. **Environmental Durability**

   - The system shall be rugged and resistant to:
     - Heat up to 70°C (operating temperature range).
     - Dust ingress (IP54 rating or higher).
     - Vibration consistent with MCC operating environments.

6. **Maintainability**
   - The system shall support remote firmware updates.
   - The system shall allow component replacement without requiring specialized tools.

## Assumptions

- MCC units are accessible for installation of monitoring equipment.
- Adequate network connectivity (wired or wireless) is available for data transmission.
- Personnel responsible for inspections have access to the exported reports/images.
- Operating environment includes elevated temperatures, dust, and vibrations typical of mining sites.

## Constraints

- Budgetary constraints may limit the use of advanced imaging sensors.
- System must operate without interfering with MCC unit operation.
- Physical installation must comply with safety and clearance requirements for high-voltage equipment.
- Development timeline constrained to academic project schedule.

## References

Link to related documents, datasheets, standards, or GitHub repos.

**IN IEEE PLEASE!**
