import React from "react";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { WeatherProvider } from "@/context/WeatherContext";
import WeatherBackground from "@/components/weather/WeatherBackground";
import WeatherStatusBar from "@/components/weather/WeatherStatusBar";

export default function TermsConditionsPage() {
  return (
    <AuthProvider>
      <WeatherProvider>
        <WeatherBackground>
          <div className="min-h-screen bg-[#060B14] flex flex-col font-sans">
            <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-gray-300">
        <h1 className="text-4xl font-bold text-white mb-2">Skill Grimoire — Terms &amp; Conditions (Student Registration)</h1>
        <p className="text-sm text-gray-500 mb-8">Effective date: [●] 2026 &middot; Last updated: [●] 2026</p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <p className="mb-4">
              These Terms &amp; Conditions (&quot;Terms&quot;) are an electronic record under the Information Technology Act, 2000 and a legally binding agreement between Skill Grimoire, a sole proprietorship concern of [Proprietor&apos;s Name] with its principal place of business at [Registered Address], Bengaluru, Karnataka, India (&quot;Skill Grimoire&quot;, &quot;we&quot;, &quot;us&quot;) and the person registering on our website (&quot;you&quot;, &quot;Student&quot;).
            </p>
            <p>
              If the Student is under 18 years of age, these Terms are entered into by the Student&apos;s parent or legal guardian on the Student&apos;s behalf (a contract with a minor being void under the Indian Contract Act, 1872), and every reference to &quot;you&quot; includes that parent/guardian. By ticking &quot;I Agree&quot; during registration, you accept these Terms and our Privacy Policy, which forms part of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Eligibility and registration</h2>
            <div className="space-y-3">
              <p>1.1 Registration is open to students of institutions that have a subsisting partnership agreement with Skill Grimoire, using the institution code provided (&quot;Partner Institution&quot;), and to such other persons as we may permit.</p>
              <p>1.2 You must provide true, accurate, current and complete information and keep it updated. One account per Student. Accounts are personal and non-transferable.</p>
              <p>1.3 We may decline, suspend or terminate any registration that is false, duplicate, fraudulent, or in breach of these Terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. The services</h2>
            <div className="space-y-3">
              <p>2.1 Skill Grimoire provides recorded skill-development lessons, periodic live online classes, assessments and challenges, and certificates and scholarships as described on our website (&quot;Services&quot;).</p>
              <p>2.2 Course content, schedules, features, assessment formats and platform functionality may be modified, updated, replaced or discontinued by us at any time to keep the programme current, without liability, provided the overall substance of the enrolled course is maintained during your academic year.</p>
              <p>2.3 Live classes run subject to educator availability; a missed live class may be substituted with a recording or a rescheduled session at our discretion.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Licence to content; intellectual property</h2>
            <div className="space-y-3">
              <p>3.1 All content on the platform — videos, scripts, presentations, question banks, assessments, certificates, logos, and the marks &quot;Skill Grimoire&quot; and &quot;Build Your Skills&quot; — is owned by or licensed to Skill Grimoire and protected under the Copyright Act, 1957 and the Trade Marks Act, 1999.</p>
              <p>3.2 You are granted a limited, personal, non-exclusive, non-transferable, revocable licence to stream and view the content for your own private, non-commercial learning during your enrolment period only.</p>
              <p>3.3 You must not: download (except where a download button is provided), record, screen-capture, copy, reproduce, share, forward, publish, upload elsewhere, sell, rent, or make the content available to any other person or platform; share your login with anyone; or use the content to build a competing product or to train any machine-learning system.</p>
              <p><strong>3.4 Breach of Clause 3.3 results in immediate termination of access without refund</strong>, forfeiture of any pending certificate or scholarship, and entitles us to recover damages and pursue civil and criminal remedies, including under the Copyright Act, 1957 and the Information Technology Act, 2000.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Code of conduct</h2>
            <p>
              You must not: impersonate any person; use another student&apos;s account; engage in any form of malpractice in assessments or challenges (including unauthorised assistance, answer-sharing, use of prohibited tools, or manipulation of our systems); probe, scrape, reverse-engineer, or interfere with the platform&apos;s security or operation; or upload unlawful, obscene, or infringing material. We may suspend or terminate access for breach, with no refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Assessments, challenges and evaluation</h2>
            <div className="space-y-3">
              <p>5.1 Assessments and scholarship challenges (including any live online challenge event) are conducted on dates, formats and rules notified by us. Questions may be randomised per student.</p>
              <p>5.2 Evaluation may be performed by automated systems, <strong>including AI-assisted evaluation</strong>, with or without human review. You consent to such evaluation.</p>
              <p>5.3 All decisions of Skill Grimoire regarding scores, rankings, eligibility, disqualification, results, scholarships and certificates are final and binding. We may require identity verification (including a short video statement) and may disqualify any submission we reasonably believe involves malpractice.</p>
              <p>5.4 We are not responsible for your device, power or internet connectivity during any online assessment. If a technical failure on our side materially disrupts an event, our sole obligation is to reschedule the event or provide an alternative attempt.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Scholarships and certificates</h2>
            <div className="space-y-3">
              <p>6.1 Scholarship pools, tiers, number of awards and amounts are as announced for your institution&apos;s batch and may vary by institution size and collections. Scholarships are awarded solely on the basis described in the applicable challenge rules.</p>
              <p>6.2 Scholarships are educational scholarships intended to be applied toward the recipient&apos;s education. Disbursement may be made to the Student&apos;s/parent&apos;s bank account or adjusted against institutional fees, at our discretion, after verification. Awards are non-transferable and cannot be exchanged or negotiated.</p>
              <p>6.3 All awards are subject to deduction of tax at source and other compliances under the Income-tax Act, 1961, as applicable. You must provide PAN/bank details and documents reasonably required for disbursement; failure to do so within 60 days of request may result in forfeiture.</p>
              <p>6.4 Certificates are issued only on satisfying the published completion/assessment criteria and remain our property to verify or revoke in cases of malpractice discovered later.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Fees, taxes and refunds</h2>
            <div className="space-y-3">
              <p>7.1 Where your Partner Institution collects the course fee as part of its own fee structure, your payment terms and any refund are governed by the institution&apos;s policy; Skill Grimoire has no direct refund obligation to you in such cases.</p>
              <p>7.2 Where you pay Skill Grimoire directly on the website: fees are as displayed at checkout, plus applicable taxes. You may cancel within 7 days of payment provided you have not accessed any course content, for a full refund; once content is accessed, fees are non-refundable, given the digital nature of the Services. Statutory rights, if any, are not affected.</p>
              <p>7.3 Prices for future academic years may be revised prospectively.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. No guarantee of outcomes</h2>
            <p>
              The Services are skill-development courses. We do not promise or guarantee any admission, examination result, job, internship, placement, salary, or any particular outcome. Testimonials or examples on our website are illustrative only. Third-party AI tools referenced in our courses belong to their respective owners; your use of them is subject to their terms, and we are not responsible for their availability, pricing, output or accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Availability; disclaimer</h2>
            <p>
              The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant uninterrupted or error-free operation. We may suspend the platform for maintenance or upgrades. To the maximum extent permitted by law, all warranties, express or implied, are disclaimed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by applicable law: (a) we are not liable for any indirect, incidental, special, consequential or punitive loss, or loss of data, opportunity or reputation; and (b) our total aggregate liability to you for all claims in any academic year shall not exceed the fees actually received by Skill Grimoire from you (or on your account) for that academic year. Nothing in these Terms limits liability that cannot be limited under Indian law, including under the Consumer Protection Act, 2019.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Indemnity</h2>
            <p>
              You agree to indemnify and hold harmless Skill Grimoire and its proprietor, employees and partners from any claim, loss or expense (including reasonable legal fees) arising from your breach of these Terms, your misuse of the Services or content, infringement of any third-party right, or information you provided being false.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
            <p>
              We may suspend or terminate your access immediately for breach of these Terms, malpractice, non-payment, or where your Partner Institution&apos;s agreement with us ends. On termination, your licence under Clause 3 ends; Clauses 3.4, 5.3, 6, 8, 10, 11, 14 and 15 survive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Communications</h2>
            <p>
              You consent to receive service communications from us by SMS, WhatsApp, email and in-app notification. You may opt out of promotional messages at any time; service messages (schedules, results, certificates) will continue while enrolled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Governing law and dispute resolution</h2>
            <div className="space-y-3">
              <p>14.1 These Terms are governed by the laws of India.</p>
              <p>14.2 Any dispute shall first be attempted to be resolved through the Grievance Officer (Clause 15). Failing resolution within 30 days, disputes shall be referred to arbitration by a sole arbitrator seated in Bengaluru, Karnataka, conducted in English under the Arbitration and Conciliation Act, 1996; the award shall be final. Nothing in this clause prevents you from exercising any non-waivable rights or remedies available under the Consumer Protection Act, 2019.</p>
              <p>14.3 Subject to the above, the courts at Bengaluru, Karnataka shall have exclusive jurisdiction.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Grievance Officer</h2>
            <p>
              [Name], Skill Grimoire, [Registered Address], Bengaluru, Karnataka — skillgrimoire.edu@gmail.com (subject &quot;Grievance&quot;). Complaints will be acknowledged and addressed within the timelines prescribed under applicable law, including the Consumer Protection (E-Commerce) Rules, 2020, to the extent applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. General</h2>
            <div className="space-y-3">
              <p><strong>16.1 Amendments:</strong> We may amend these Terms by posting the updated version on the website with a revised &quot;Last updated&quot; date; material changes will be notified. Continued use constitutes acceptance.</p>
              <p><strong>16.2 Assignment:</strong> You may not assign these Terms. We may assign them to a successor of our business.</p>
              <p><strong>16.3 Severability &amp; waiver:</strong> If any clause is held invalid, the rest survive. Our failure to enforce a right is not a waiver.</p>
              <p><strong>16.4 Force majeure:</strong> We are not liable for delay or failure caused by events beyond reasonable control (including internet or power outages, third-party platform failures, epidemics, or government action).</p>
              <p><strong>16.5 Entire agreement:</strong> These Terms and the Privacy Policy are the entire agreement between you and Skill Grimoire regarding the Services and override prior discussions.</p>
            </div>
          </section>

        </div>
      </main>
          </div>

          {/* Dynamic Weather & Atmosphere Floating Status Bar */}
          <WeatherStatusBar />
        </WeatherBackground>
      </WeatherProvider>
    </AuthProvider>
  );
}
