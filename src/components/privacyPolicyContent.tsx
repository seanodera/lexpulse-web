'use client'
import React from 'react';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyContent = () => {
  return (
    <section className="blog-single">
      <div className="container mx-auto p-4">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="blog-single__left">
              <Card className="bg-white p-8 shadow-md rounded">
                <Typography>
                  <Text className="text-gray-500 mb-5 block">
                    Last Updated Jan, 2024
                  </Text>

                  <Paragraph>
                    This Privacy Policy (&quot;Policy&quot;) explains how Lexpulse (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, discloses, and protects your personal information when you use our mobile application (the &quot;App&quot;). By using the App, you agree to the terms of this Policy.
                  </Paragraph>
                  
                  <Divider />

                  <Title level={2}>Information We Collect</Title>
                  <Paragraph>
                    <Text className="font-bold">1.1. Information You Provide:</Text> When you use the App, you may provide us with personal information, including but not limited to your name, email address, username, and any other information you choose to share.
                  </Paragraph>
                  <Paragraph>
                    <Text className="font-bold">1.2. Content:</Text> The App may allow you to create and share content, such as text, graphics, videos, and other materials (&quot;Content&quot;). This Content may contain personal information, and you are solely responsible for any personal data included in your Content.
                  </Paragraph>

                  <Divider />

                  <Title level={2}>How We Use Your Information</Title>
                  <Paragraph>
                    <Text className="font-bold">2.1. Providing and Improving the App:</Text> We use your personal information to provide and maintain the App, as well as to improve its functionality, features, and user experience.
                  </Paragraph>
                  <Paragraph>
                    <Text className="font-bold">2.2. Communications:</Text> We may use your email address to communicate with you, send updates, respond to inquiries, and provide customer support.
                  </Paragraph>

                  <Divider />

                  <Title level={2}>Information Sharing</Title>
                  <Paragraph>
                    <Text className="font-bold">3.1. Third-Party Service Providers:</Text> We may share your personal information with third-party service providers who assist us in operating the App and delivering services to you. These service providers are contractually obligated to protect your personal information.
                  </Paragraph>
                  <Paragraph>
                    <Text className="font-bold">3.2. Legal Requirements:</Text> We may disclose your information in response to lawful requests by public authorities, such as to meet national security or law enforcement requirements.
                  </Paragraph>

                  <Divider />

                  <Title level={2}>Data Security</Title>
                  <Paragraph>
                    We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
                  </Paragraph>

                  <Divider />

                  <Title level={2}>Changes to this Privacy Policy</Title>
                  <Paragraph>
                    We may update this Privacy Policy to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Policy on the App, and the updated Privacy Policy will take effect on the date specified in the notice.
                  </Paragraph>

                  <Divider />

                  <Title level={2}>Contact Us</Title>
                  <Paragraph>
                    If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at thelexpulseteam@fadorteclimited.com.
                  </Paragraph>
                </Typography>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;