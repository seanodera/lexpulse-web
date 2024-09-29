import React from 'react';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function TermsOfServiceContent() {
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

                    <Title level={2}>Acceptance of Terms</Title>
                    <Paragraph>
                      Welcome to Lexpulse (&quot;the App&quot;). By accessing or using this App, you agree to comply with and be bound by these Terms of Service (&quot;TOS&quot;). If you do not agree to these terms, please do not use the App.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Use of the App</Title>
                    <Paragraph>
                      <Text className="font-bold">2.1.</Text> You must be at least 18 years old or the legal age of majority in your jurisdiction to use this App. By using the App, you represent that you meet these requirements.
                    </Paragraph>
                    <Paragraph>
                      <Text className="font-bold">2.2.</Text> You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password.
                    </Paragraph>
                    <Paragraph>
                      <Text className="font-bold">2.3.</Text> You may not use the App for any illegal or unauthorized purpose. You agree to comply with all local laws and regulations regarding your use of the App.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Content and Services</Title>
                    <Paragraph>
                      <Text className="font-bold">3.1.</Text> The App may allow users to post, link, share, and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are solely responsible for the Content you post.
                    </Paragraph>
                    <Paragraph>
                      <Text className="font-bold">3.2.</Text> You retain ownership of your Content, but you grant Lexpulse a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your Content in connection with the App.
                    </Paragraph>
                    <Paragraph>
                      <Text className="font-bold">3.3.</Text> The App may provide services related to event discovery, ticketing, messaging, and meetups. These services are subject to change without notice.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Privacy</Title>
                    <Paragraph>
                      Your use of the App is also governed by our Privacy Policy, which can be found on our website. By using the App, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Termination</Title>
                    <Paragraph>
                      We may terminate or suspend your account and access to the App immediately, without prior notice or liability, for any reason whatsoever, including a breach of the TOS.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Limitation of Liability</Title>
                    <Paragraph>
                      <Text className="font-bold">6.1.</Text> The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </Paragraph>
                    <Paragraph>
                      <Text className="font-bold">6.2.</Text> In no event shall Lexpulse be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from (a) your use or inability to use the App; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruptions or cessation of transmission to or from the App; (d) any bugs, viruses, or the like that may be transmitted to or through the App; or (e) any errors or omissions in any Content or for any loss or damage of any kind incurred as a result of your use of any Content posted, emailed, transmitted, or otherwise made available via the App, whether based on warranty, contract, tort, or any other legal theory, and whether or not Lexpulse is advised of the possibility of such damages.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Changes to the TOS</Title>
                    <Paragraph>
                      We reserve the right to modify or replace these TOS at any time. It is your responsibility to check these TOS periodically for changes. Your continued use of the App after we post any modifications to the TOS will constitute your acceptance of such modifications.
                    </Paragraph>

                    <Divider />

                    <Title level={2}>Contact Us</Title>
                    <Paragraph>
                      If you have any questions or concerns about these TOS, please contact us at thelexpulseteam@fadorteclimited.com.
                    </Paragraph>
                  </Typography>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
