import { Section } from "@/Components/ui/section";
import { PageHeader } from "@/Components/ui/page-header";
import { InfoBlock } from "@/Components/ui/info-block";
import { TeamCard } from "@/Components/ui/team-card";

export default function About() {
  return (
    <div className="bg-brand-BG min-h-screen pb-16">
      <Section>
        <PageHeader
          title="About Us"
          subtitle="Learn more about our mission, values, and the story behind RentalHub."
        />
        <div className="space-y-10">
          <InfoBlock title="Who We Are">
            <strong>RentalHub</strong> is built to make property management simple, modern, 
            and accessible. We combine powerful tools with a clean and intuitive interface 
            to help owners and tenants manage everything effortlessly.
          </InfoBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoBlock title="Our Mission">
              To provide a seamless, efficient, and transparent property renting experience 
              through innovative technology and user-focused design.
            </InfoBlock>

            <InfoBlock title="Our Vision">
              To become India’s most trusted platform for rental and property management, 
              empowering millions with smart tools and reliable services.
            </InfoBlock>
          </div>

          <InfoBlock title="Our Journey">
            Founded in 2021, RentalHub started as a small project and has grown into a trusted 
            platform serving thousands of users with advanced features and modern technology.
          </InfoBlock>
        </div>
      </Section>

    
      <Section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Team</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <TeamCard
            img="team-member1.jpg"
            name="Sai Pallavi"
            role="Founder"
          />
          <TeamCard
            img="team-member2.jpg"
            name="Vaishnavi"
            role="Developer"
          />
        </div>
      </Section>

      <Section>
        <InfoBlock title="Our Core Values">
          <ul className="space-y-3 text-gray-700 leading-relaxed">
            <li>✔ <strong>Innovation</strong> — Constant improvement and smart solutions.</li>
            <li>✔ <strong>Integrity</strong> — Transparent, honest, and reliable.</li>
            <li>✔ <strong>User First</strong> — Everything we build is for our users.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section>
        <InfoBlock title="Connect With Us">
          Have questions or suggestions? We’d love to hear from you!  
          <br />
          <a
            href="mailto:2300030250@kluniversity.in"
            className="text-blue-600 font-medium hover:underline"
          >
            ilamsarathchandra@gmail.com
          </a>
        </InfoBlock>
      </Section>
    </div>
  );
}
