import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useEngineStore from "@/storage/engines";
import { useShallow } from "zustand/react/shallow";
import { guid } from "../../../../../plugins/utils/guid";

const About = () => {
  const engineStore = useEngineStore(
    useShallow((state) => ({
      generalConfigs: state.generalConfigs,
    }))
  );
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

    // const { detect, translate, voice } = await import("/plugins/collect.json");
    // console.log(detect, translate, voice);

    // TODO: 平台id 读取config,暂时写死方便调试
    const platformId = "tencent";
    const platformParams = engineStore.generalConfigs[platformId];
    // const { detect } = await import("/plugins/detect/tencent.js");
    // await detect("interface", { ...platformParams });

    // const { translate } = await import("/plugins/translate/tencent.js");
    // await translate("Professional", "auto", "zh", { ...platformParams });

    // const { translate } = await import("/plugins/translate/hack_360.js");
    // await translate("hello", "en", "zh", { ...platformParams });

    console.log(guid());
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
