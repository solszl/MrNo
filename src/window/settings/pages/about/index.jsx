import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const languageDetect = async () => {
    // const { version, detect } = await import("/plugins/detect/iciba.js");

    // const resp = await detect("私の生活", {
    //   fetch,
    //   Body,
    // });

    // console.log(resp);

    // const { version, translate } = await import("/plugins/translate/baidu.js");

    // await translate("auto", "zh", "hello", {
    //   fetch,
    //   Body,
    //   Client,
    //   ResponseType,
    //   getClient,
    // });

    const { detect, translate, voice } = await import("/plugins/collect.json");
    console.log(detect, translate, voice);
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
