import Layout from "../components/Layout";

export default function TOS() {
  return (
    <Layout>
      <div className="flex flex-col mx-8 my-4 gap-5">
        <h1 className="text-5xl font-bold ">
          Educast Terms of Service Agreement
        </h1>
        <p className="text-xl">
          Welcome to Educast, a platform for live streaming educational content!
          By using Educast, you agree to the following terms and conditions:
        </p>

        <h2 className="text-2xl font-semibold">1. Account Creation</h2>
        <ol>
          <li>To use Educast, you must create an account.</li>
          <li>
            You are responsible for keeping your account information accurate
            and up-to-date.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account information.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">2. Conduct Guidelines</h2>
        <ol>
          <li>You agree to use Educast for lawful purposes only.</li>
          <li>You agree to comply with all applicable laws and regulations.</li>
          <li>
            You agree not to use Educast to post or transmit any content that is
            unlawful, defamatory, harassing, obscene, or otherwise
            objectionable.
          </li>
          <li>
            You agree not to use Educast to infringe on the intellectual
            property rights of others.
          </li>
          <li>
            You agree not to use Educast to distribute spam or other unsolicited
            messages.
          </li>
          <li>You agree not to impersonate others or misrepresent yourself.</li>
        </ol>

        <h2 className="text-2xl font-semibold">3. User Content</h2>
        <ol>
          <li>
            You retain ownership of any content that you post or transmit
            through Educast.
          </li>
          <li>
            You grant Educast a non-exclusive, royalty-free, perpetual,
            worldwide, transferable license to use, display, and distribute your
            content.
          </li>
          <li>
            You agree not to post or transmit any content that infringes on the
            rights of others.
          </li>
          <li>
            You agree that Educast may remove any content that violates these
            terms of service or is otherwise objectionable.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">4. Livestreaming Guidelines</h2>
        <ol>
          <li>
            You are solely responsible for the content of any livestream that
            you initiate.
          </li>
          <li>
            You agree not to use Educast to livestream any content that is
            unlawful, defamatory, harassing, obscene, or otherwise
            objectionable.
          </li>
          <li>
            You agree not to livestream any content that infringes on the
            intellectual property rights of others.
          </li>
          <li>
            You agree not to livestream any content that is harmful to minors.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">5. Termination</h2>
        <ol>
          <li>
            Educast reserves the right to terminate your account for any reason,
            without notice.
          </li>
          <li>
            You may terminate your account at any time by contacting Educast.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
        <ol>
          <li>
            Educast makes no warranties, express or implied, regarding the
            quality or reliability of its services.
          </li>
          <li>
            Educast is not responsible for any content that is posted or
            transmitted through its platform.
          </li>
        </ol>
      </div>
    </Layout>
  );
}
