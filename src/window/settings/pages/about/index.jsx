import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Body, fetch } from "@tauri-apps/api/http";

const About = () => {
  const languageDetect = async () => {
    const { version, detect } = await import("/plugins/detect/iciba.js");

    const resp = await detect("私の生活", {
      fetch,
      Body,
    });

    console.log(resp);
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">About</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <Button onClick={languageDetect}>测试</Button>
    </div>
  );
};

export default About;
