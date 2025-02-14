/* eslint-disable max-len */
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Button, IconButton, ResponsiveProvider,
  Stack, Tabs,
  TextChip, Textfield, Title, useOverlayContext,
} from '../..';
import { Modal } from './modal';

const DefaultChildren = () => (
  <Stack hPadding={24}>
    <Textfield label="Test" />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
    distinctio qui quod ducimus libero magni earum perspiciatis.
    <button type="button">click</button>
  </Stack>
);

const meta: Meta<typeof Modal> = {
  title: 'Dialogs/Modal',
  component: Modal,
  args: {
    autoFocus: true,
    children: <DefaultChildren />,
    isOpen: false,
    onClose: () => {
      alert('Modal closed');
    },
  },
  decorators: [
    Story => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
  render: function Render({ ...args }) {
    const [{ isVisible }, setIsVisible] = useArgs<{ isVisible: boolean }>();
    const handleClose = (visibility: boolean) => setIsVisible({ isVisible: visibility });

    return (
      <>
        <Button onClick={() => handleClose(true)}>Show Modal</Button>
        <Modal
          {...args}
          key="dynamic-modal"
          isOpen={isVisible}
          onClose={() => handleClose(false)}
        >
          <Modal.Content heading="Modal title">
            {args.children}
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

const CustomContentModal = () => {
  const { onClose, headingId } = useOverlayContext();

  return (
    <Stack vAlign="center">
      <Stack direction="row" fill={false} vAlign="center" hAlign="space-between">
        <Title level="5" id={headingId}>{headingId}</Title>
        <IconButton onClick={() => onClose?.()} icon="remove" kind="flat" aria-label="Close modal" />
      </Stack>
      <Textfield label="Test" />
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      <img width="100%" height="auto" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
    </Stack>
  );
};

export const CustomContent = {
  args: {
    children: <CustomContentModal />,
  },
} satisfies Story;

export const WithTitleComponent = {
  args: {},
  render: function Render({ ...args }) {
    const [{ isOpen }, setIsVisible] = useArgs<{ isOpen: boolean }>();
    const handleClose = (visibility: boolean) => setIsVisible({ isOpen: visibility });

    return (
      <>
        <Button onClick={() => handleClose(true)}>Show Modal</Button>
        <Modal
          {...args}
          key="dynamic-modal"
          isOpen={isOpen}
          onClose={() => handleClose(false)}
        >
          <Modal.Content heading={<TextChip text="MA" />}>
            {args.children}
          </Modal.Content>
        </Modal>
      </>
    );
  },
} satisfies Story;

export const WithTabInside = {
  args: {},
  render: function Render({ ...args }) {
    const [{ isOpen }, setIsVisible] = useArgs<{ isOpen: boolean }>();
    const handleClose = (visibility: boolean) => setIsVisible({ isOpen: visibility });

    return (
      <>
        <Button onClick={() => handleClose(true)}>Show Modal</Button>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatum eius, reprehenderit placeat similique tempore omnis quidem, nam laudantium minus earum quis neque in consequuntur culpa deserunt perferendis quod magnam?
        Facere, repellendus suscipit, vero dolores omnis laborum nostrum culpa qui quasi distinctio nihil vel tenetur ipsa beatae amet sint. Architecto voluptatibus labore odio eveniet possimus tenetur. Molestias facilis praesentium id.
        Fugit, atque. Eius blanditiis molestiae repudiandae dignissimos, ipsam ex ea facere sequi eveniet dolorem, sapiente nihil nobis totam illum voluptatum dolorum debitis eum deleniti commodi aspernatur! Illo provident adipisci optio.
        Sunt facilis ipsum aliquid possimus cum voluptatem sapiente facere! Eos odio optio voluptate quas, quidem quia laudantium. Atque, perferendis qui itaque odit, earum dicta suscipit modi porro consequatur obcaecati nam!
        Ullam, odit, explicabo nulla eum incidunt itaque repellat quia asperiores earum fugiat, nihil nesciunt sit odio ut maxime at error ipsa repudiandae! Dolorem, est facilis. Exercitationem a et voluptatibus quibusdam.
        Voluptates fugiat nostrum natus consequuntur nesciunt dolorem, aut a, maxime earum adipisci deleniti veniam laboriosam nisi iste eveniet illo minima excepturi esse distinctio ullam beatae. Labore suscipit voluptas et at!
        Labore, temporibus quae rem omnis minus natus odio consequuntur iure, laudantium architecto asperiores impedit quia. Fuga enim cupiditate blanditiis atque, tempora sed eligendi officia, sapiente, recusandae reprehenderit voluptatibus iure quam.
        Repudiandae repellendus unde ducimus quibusdam nihil quo dolorum rerum odio soluta officia. Optio, atque autem corrupti modi expedita, dolorum rem tempore cum dolores consequatur dignissimos eos? Repudiandae sit animi nihil!
        Blanditiis est expedita repudiandae mollitia nemo, repellat veritatis ducimus ratione commodi iure sunt exercitationem itaque beatae obcaecati eos. Maxime soluta tempora nesciunt, nam ratione voluptate ipsam pariatur minus reiciendis dicta.
        Eaque porro fuga, enim sapiente veritatis nostrum nesciunt consequuntur omnis consequatur quo illo temporibus debitis corrupti recusandae iste quasi reprehenderit voluptatum facilis sit numquam est. Provident nobis omnis modi inventore.
        Molestias illum iure eaque possimus modi assumenda deserunt aspernatur accusamus cupiditate. Recusandae maxime non error velit provident, corrupti distinctio. Hic eveniet provident laboriosam molestiae, architecto quam aspernatur veniam perspiciatis libero?
        Iste libero perspiciatis quae, debitis ipsam porro quis, maxime omnis nisi, tempore officiis doloremque optio quaerat qui velit cum. Laboriosam recusandae laborum impedit aspernatur fugit velit enim suscipit corrupti id!
        Aliquam, impedit ad. Similique nam earum, sit voluptatibus facilis harum expedita accusamus accusantium explicabo ipsam, dicta sequi nesciunt repellat inventore dolorum! Hic accusantium natus similique perspiciatis incidunt voluptate aspernatur optio.
        Incidunt hic ut mollitia tempora omnis inventore, asperiores nobis dolorem odit facilis vitae vel eos exercitationem modi excepturi sapiente error? Error sequi fuga est consectetur veniam? Modi molestias molestiae asperiores.
        Doloribus, ullam officia. Voluptatum dolores atque nulla nostrum mollitia commodi, enim aperiam vero repellat, odit inventore ipsam voluptate, iste voluptatem pariatur impedit temporibus laboriosam quo praesentium. Nobis ipsum ipsa ab.
        Iure, culpa aspernatur est repudiandae similique ratione facere odio molestias quidem nam itaque suscipit quos laborum, blanditiis vitae expedita mollitia neque, nobis voluptatibus tempore. Consequuntur ea quidem consequatur harum ipsum!
        Repudiandae tenetur voluptates qui numquam quaerat magnam aliquam labore animi. A laborum iure libero quod animi, quisquam nemo at adipisci corporis provident saepe ducimus alias atque dolores pariatur minus perspiciatis.
        Consectetur maiores illo quas, soluta reprehenderit harum quam, quis eveniet quisquam laborum sequi laboriosam vel explicabo qui, similique aut. Aliquam provident mollitia, possimus beatae consectetur aut minima quod culpa iure.
        Autem quidem sequi incidunt optio error nemo ea explicabo ut unde rem quisquam tempora vero nisi exercitationem, pariatur impedit atque eius minima debitis eos quaerat? Consectetur veniam officiis cumque perferendis.
        Similique vero officia reprehenderit rerum adipisci quod suscipit molestiae repudiandae aut quia distinctio error quasi animi accusantium fugiat dolorem amet molestias provident impedit, optio consequuntur voluptatem ipsa? Officia, enim dolore?
        Aut repellendus dignissimos, totam ex nisi fugit sapiente, amet quia sint ipsa distinctio. Aperiam vero quae reiciendis nulla consectetur nostrum, perferendis modi, necessitatibus itaque, iusto odit illo laudantium cumque recusandae?
        Perspiciatis, accusamus eius hic ipsam pariatur expedita eos corporis quas qui illo culpa possimus recusandae temporibus doloremque fuga ab vitae officia sed praesentium ducimus sit dolorem at ad? Sit, nemo.
        Iure, hic maiores dolor molestiae ab, maxime ipsum beatae quaerat et commodi cumque doloremque, repellat quibusdam debitis pariatur ipsa a quisquam quo porro libero perspiciatis repudiandae in rem? Fugiat, facere?
        Quae, incidunt rem ea eligendi nihil vero alias itaque illo repudiandae dignissimos, vitae quam, magnam enim soluta qui doloremque tempora officiis consequuntur. Harum minus dolore magnam iste earum? Incidunt, adipisci?
        Voluptas aspernatur recusandae, a ducimus sed natus voluptatibus perspiciatis maxime, hic quae nihil deserunt aut? Sunt praesentium aperiam reiciendis dolores quod sit aliquid dolorum obcaecati dolore. Dolorum facere eligendi ipsa!
        Nostrum nam optio nisi voluptas odio a nesciunt dolorem eaque aperiam doloribus vitae sed et illum fugit consequatur nemo sequi ipsam, velit repellat voluptatibus enim accusamus amet. Atque, pariatur ex!
        Ullam vitae obcaecati, itaque consequatur nesciunt repellendus molestias impedit recusandae tempore molestiae. Beatae libero id illum consequuntur labore nobis, voluptas amet reprehenderit, totam ratione, dicta et ex praesentium? Eaque, consequuntur.
        Facilis, eligendi. Similique deleniti quae, rem reiciendis quibusdam necessitatibus veritatis ipsam enim labore aperiam ipsa eaque repellendus? Ex molestiae est voluptas. Ratione cumque repudiandae similique vero nemo excepturi rem tempore.
        Sit sunt tenetur cupiditate quod voluptatem quisquam blanditiis est ducimus aspernatur consectetur explicabo, esse natus veniam obcaecati quia incidunt magni necessitatibus sint laboriosam, dolore qui eos! Quod reiciendis doloremque omnis.
        Nisi dolores fugiat labore soluta accusantium eligendi quidem at. Velit repellat exercitationem fuga magnam vel explicabo a, earum repudiandae ad cumque ratione pariatur ullam sint. Nam, natus? Quisquam, eius doloremque.
        Unde quam doloribus quis porro quidem officiis voluptatem, nulla odit incidunt amet commodi obcaecati officia eveniet totam placeat ex libero iure. Voluptatum minima, cumque ad deleniti debitis quia nulla unde.
        Rerum nobis quaerat corrupti libero sequi laudantium in enim, aliquid commodi dicta, dolore vel ea natus reprehenderit exercitationem laboriosam soluta nulla sit numquam. Quos assumenda enim culpa laboriosam. Similique, provident.
        Laborum ea maxime exercitationem, rem similique est iure, provident distinctio quaerat eius earum nisi corporis sed illum a optio non temporibus natus pariatur! Similique unde autem ea animi beatae sed?
        Expedita assumenda animi eos aliquam maiores dolores atque, amet eveniet quisquam, tenetur voluptatibus rem velit perferendis iste itaque aspernatur. Dolorem totam quisquam necessitatibus esse! A porro quae alias aliquam ea.
        Ut similique alias explicabo tempora quia incidunt excepturi eos numquam, dolorem dicta totam repellat sint iste quis. Totam, eaque placeat? Quisquam placeat beatae veritatis harum mollitia culpa nesciunt cupiditate tempora.
        Natus consequatur voluptatibus assumenda illum pariatur error nesciunt soluta modi id placeat labore recusandae ea veniam libero, nemo laudantium expedita quia aspernatur cum. Esse asperiores enim at mollitia necessitatibus quo?
        Ea dolorum amet minima qui quasi, ducimus fugit ipsam, eos eaque, aspernatur culpa assumenda? Quis iusto vitae illo quisquam, aut perferendis dolorem atque natus, deserunt sint debitis accusamus sed animi.
        Eum veritatis beatae fuga aut molestias iste quos unde, sit earum quibusdam, inventore minus ratione explicabo laboriosam libero nostrum cum at. Modi non voluptatem mollitia atque fuga nihil ipsum expedita?
        Iure reiciendis odio cumque, nostrum culpa assumenda doloremque! Animi iste qui id vero velit amet error ad deserunt ab ipsum ipsa nihil nesciunt praesentium aspernatur a blanditiis, nisi excepturi. Delectus.
        Optio dolores deserunt, mollitia cumque reprehenderit a velit maiores eum, cum, ipsa asperiores atque voluptatem facilis quo? Sequi fuga officiis praesentium molestiae, accusamus laudantium exercitationem laborum facere in at iste.
        Aliquam optio laudantium facere a nesciunt iure doloremque magnam itaque consequatur in quasi, assumenda similique, praesentium necessitatibus? Magnam nobis laboriosam quasi quod accusantium voluptatibus error commodi libero, veniam quam dolore!
        Facere nobis nostrum ut reiciendis dolorum incidunt dicta ea, vero amet? Voluptate, aliquid perferendis asperiores fugiat necessitatibus distinctio aperiam, quaerat amet et modi at a earum, esse voluptatibus explicabo tempora!
        Dolore doloribus repellat excepturi eveniet adipisci! Quas aperiam veritatis repudiandae exercitationem neque minus eius rerum ab. Dolorum nostrum sequi ab amet ea odit asperiores pariatur, recusandae eligendi repudiandae architecto id!
        Maiores voluptatibus reprehenderit quas expedita saepe quia! Voluptatem deleniti officiis quae commodi quas quos possimus assumenda ipsum? Fugiat sit cupiditate consequuntur ut sed similique, animi veniam eum officia, dolor exercitationem.
        Assumenda, autem quas debitis quae eveniet est cupiditate praesentium ipsam soluta alias asperiores laborum aspernatur dicta laboriosam, quibusdam tempora sint fugiat! Aperiam, corrupti id sequi fugiat architecto explicabo perspiciatis vero?
        In totam eligendi itaque, dolor cumque perspiciatis, non tenetur assumenda ducimus quisquam minima ut praesentium id possimus maxime molestias? Ipsum tenetur et natus dolorum sed quos quis reiciendis at distinctio.
        Quasi aspernatur in accusamus voluptas nemo? Maxime, quaerat. Repudiandae consequatur tenetur amet recusandae, aut quod! Modi facere consequatur nam. Quo maxime impedit sapiente aliquam deserunt repudiandae molestiae consectetur minima necessitatibus.
        Incidunt qui quas animi inventore consectetur. Suscipit ratione eaque inventore rerum, adipisci voluptate corrupti, doloribus minus incidunt dolorem sunt modi, esse soluta cum? Officiis illo assumenda fuga modi cum molestiae!
        Totam modi quo nisi eligendi cumque sit quae animi obcaecati ratione, numquam iure esse quibusdam molestiae facilis necessitatibus laudantium autem. Amet provident expedita accusantium aspernatur iste veritatis atque saepe fugit!
        Perspiciatis animi quisquam incidunt a sapiente voluptatem fugit dignissimos! Odit, praesentium quod laboriosam dicta consequatur eveniet reprehenderit culpa soluta vero. Cupiditate quibusdam nemo eius necessitatibus! Obcaecati non assumenda ipsam eaque!
        Itaque autem sit porro fuga corrupti perspiciatis et corporis eos distinctio aliquam quo aliquid laborum rerum natus illo veniam maiores repellat, beatae asperiores nostrum tempore illum impedit. Laborum, eveniet exercitationem.
        Adipisci cumque sapiente alias omnis asperiores optio. Qui officiis facere quidem atque eos consequatur praesentium excepturi alias pariatur! Suscipit ipsam consectetur tempora, doloribus tenetur repellat corporis. Architecto consequatur iusto iste?
        Natus vel perferendis quaerat consequatur expedita, ex autem similique accusamus? Earum nisi sunt fuga, sed non asperiores et vero quod dolores sint iste voluptatum ab obcaecati mollitia suscipit possimus illo?
        Assumenda eum aut cupiditate quos delectus, tempora qui doloribus et ipsum alias corrupti, quo dolorum, animi minima aspernatur inventore. Voluptatum aperiam officiis repudiandae iste inventore earum nobis natus repellendus nisi!
        Culpa, cumque? Dolorum asperiores totam et quae adipisci, nostrum veritatis laudantium cupiditate repudiandae architecto officiis necessitatibus. Repellendus, laboriosam eum totam quaerat repellat laborum nesciunt aut distinctio iure sint, dolor impedit.
        Possimus aut distinctio error sunt, veniam dicta alias, voluptate saepe nisi adipisci itaque est rerum soluta fugit aperiam, laborum molestiae blanditiis minima iusto minus aliquam reiciendis ipsa impedit. Hic, doloribus.
        Similique, hic molestiae. Possimus illo sapiente praesentium deserunt! Ut officia sequi nam laborum esse voluptates facere, et accusantium, a maxime nostrum. Mollitia, placeat nihil tempora quis optio repellendus dolorum iste?
        Qui officia suscipit impedit velit repellendus debitis praesentium obcaecati autem provident libero ratione ipsum assumenda eligendi quaerat, cum, aut esse id tenetur nostrum tempora quod quam veritatis in officiis? Hic.
        Neque velit deleniti repudiandae temporibus officiis est distinctio sequi earum labore minus, veritatis, id totam ipsam animi! Blanditiis laudantium aut suscipit? Debitis earum placeat magni. Tempore ipsum enim error veniam?
        Provident quis excepturi beatae, fuga incidunt ad obcaecati, quasi tenetur ab itaque accusantium! Voluptates veritatis architecto nostrum expedita praesentium modi, earum possimus blanditiis, pariatur, placeat quae ullam repellat est laborum?
        Eveniet molestiae at nostrum hic dolorem voluptatem aut, necessitatibus dolore perferendis id adipisci inventore dignissimos, deleniti libero nisi illum, quaerat mollitia culpa porro sed quisquam odit optio aspernatur? Pariatur, vitae.
        Inventore, facilis temporibus quod illo optio modi, asperiores quaerat qui tenetur explicabo molestiae soluta totam iusto, quae recusandae voluptates error. Quidem consequuntur aperiam rerum ex! Deserunt vitae suscipit natus fuga!
        Odio iusto excepturi placeat iure commodi nisi corporis non doloremque earum pariatur, optio quos dolorum? Inventore dicta, maiores fuga laborum commodi, nulla aliquid quos officiis explicabo autem tenetur dignissimos est?
        Tempora voluptatem reiciendis qui maiores earum repudiandae voluptatibus doloribus, error id odio, itaque, at esse. Labore sequi molestias deleniti eos minus cumque corporis, tempora qui a, velit quae quibusdam officiis!
        Porro deleniti sed laudantium ullam illo delectus ratione! Suscipit perspiciatis temporibus ullam excepturi voluptate aperiam quasi delectus, animi obcaecati a, eveniet quisquam repellat ad modi, fugiat autem accusantium assumenda! Provident?
        Adipisci non alias maxime optio autem architecto ut, saepe, incidunt distinctio, omnis debitis necessitatibus quibusdam porro quisquam magni repellat commodi ipsum praesentium soluta quo at facilis libero obcaecati! Quos, consequuntur.
        Cumque ut iure assumenda vel fuga eveniet consectetur vero at aperiam. Debitis maiores adipisci perferendis neque sunt mollitia quae at quibusdam pariatur quidem? Dignissimos, illum explicabo? Assumenda at ducimus odit?
        Quidem debitis distinctio mollitia laudantium ducimus, doloremque in rerum veritatis eaque, ipsa sint officia assumenda minima pariatur voluptate. Porro ex incidunt blanditiis quasi eveniet tempore perferendis saepe ea officiis in!
        Quia beatae, repellendus molestias, quidem ipsa nisi consectetur totam aut, animi ut sit minus consequatur! Voluptate autem neque similique numquam, mollitia tenetur laborum! Provident molestiae mollitia odio, officiis voluptatem ipsam!
        Eligendi architecto cupiditate voluptate harum voluptatum quod ducimus fugit, voluptatem debitis sit deleniti nihil porro, quisquam cum velit facere saepe quaerat adipisci assumenda quas. Praesentium a harum error sunt molestiae!
        Saepe quidem optio possimus obcaecati! Ex odit, impedit iusto veniam mollitia vel corporis molestiae voluptas voluptatibus sint eius placeat vero deleniti nobis veritatis earum illum unde qui ad. Error, exercitationem!
        Culpa repudiandae placeat architecto labore aspernatur voluptas? Consequatur ex mollitia hic eum ratione obcaecati quia! Nihil, ratione in ad iste officiis fugit eaque, totam eius facilis corporis beatae cum earum.
        Iure, porro delectus? Recusandae ratione repellendus, totam ab vero commodi et voluptatem quidem reiciendis similique corporis laboriosam mollitia odio, tempore dolorum voluptatibus quasi voluptas. Explicabo aspernatur est dolorem facere culpa?
        Sapiente minus id, maxime, ullam ducimus magnam vero maiores deserunt hic dolorum consequuntur quasi! Earum quidem exercitationem quas ipsa unde placeat enim laudantium molestiae vero sed? Provident omnis dignissimos facilis?
        In dolorem voluptatibus facere. Sapiente commodi expedita corrupti, reiciendis obcaecati itaque maiores quaerat amet quos facilis dolor? Molestiae, perspiciatis mollitia! Similique nihil harum, doloremque eum laboriosam consequatur! Neque, accusantium sunt!
        Quos, sequi minus! Deserunt, beatae in ipsam, minima rerum sit ad vitae magni quos ab cupiditate nihil at est exercitationem fugiat cum molestiae labore. Reprehenderit fugit quaerat beatae nostrum incidunt.
        Accusantium facere vero temporibus tempora. Sit debitis quia deleniti omnis nobis dolorem nisi. Officia nostrum et iusto, libero, itaque dignissimos expedita, vero provident sunt molestias similique voluptatum labore quaerat. Facere!
        Facere provident est et iure? Illum, reiciendis soluta. Voluptatum eaque debitis quasi provident nesciunt eos animi ipsa natus, dolorem laudantium dicta repellendus exercitationem, dolores inventore maiores quisquam, accusantium repellat molestiae.
        Deserunt expedita animi iste fuga asperiores atque tempora error ea optio autem quo dolorum adipisci corrupti, minima at numquam eaque dolore amet ipsam natus quibusdam non! Eos accusamus illum minus.
        Laboriosam, harum consectetur quidem error enim facere debitis, dolore consequuntur aspernatur qui sint perspiciatis. Magnam corporis ratione itaque minima veritatis architecto dignissimos? Corrupti fugit, aperiam molestiae eum ea omnis alias.
        Architecto ipsam harum temporibus ullam, ad consequatur nemo vel alias iusto ratione. Quam ducimus sunt, ratione nobis iure fugit culpa, dignissimos dolorem mollitia veritatis aut veniam similique tenetur consequuntur sit!
        Voluptate, at ab quia expedita fugiat assumenda cum sed, eos voluptatibus, consequatur ea? Repudiandae neque mollitia dolorum amet pariatur rerum corporis? Eveniet, voluptatum reiciendis. Nostrum, dicta aut? Accusamus, autem assumenda!
        Quae reprehenderit earum excepturi consequatur quidem quos dignissimos quis, labore eaque explicabo non totam ratione laudantium maxime iste qui nobis porro ducimus minus provident voluptatibus soluta. Tempora dignissimos officiis reprehenderit.
        Et, velit molestiae ratione numquam corporis deleniti amet doloribus quam qui sequi ad, ab quod error illum molestias cumque a dicta commodi in autem itaque. Quae incidunt similique sint beatae.
        Sint animi quidem maxime voluptas non, voluptates, eaque iure enim adipisci maiores accusamus quibusdam! Facere quidem id voluptatum, velit similique consectetur officia fuga culpa distinctio nihil eos, nam dolore ducimus.
        Saepe maxime quod impedit sit fugiat exercitationem, totam facilis magni eius, doloremque debitis deleniti. Et sint quae, repudiandae voluptatibus ipsa quod beatae nobis eum corrupti dolorem voluptate laboriosam iure voluptas?
        Aut amet ratione blanditiis deleniti dolorem, enim vero cumque, distinctio autem vel ipsam in, asperiores facere accusantium laboriosam nostrum commodi est officiis? Nemo quaerat sed veniam ab beatae reprehenderit sequi.
        Nisi nobis porro consectetur eum, culpa odio possimus eos necessitatibus molestias expedita exercitationem, ipsa assumenda dolorum sed architecto voluptatibus! Hic obcaecati et facere. Ducimus aspernatur, amet ex corporis sed quia?
        Dolores suscipit quasi rerum neque assumenda, laborum nobis, repellat ducimus modi reprehenderit ullam, veritatis sunt blanditiis delectus consequatur eligendi labore iste! Minima aspernatur consectetur autem hic quia beatae nam facilis!
        Quis, sunt quidem voluptatum quos cupiditate, laboriosam hic quod incidunt nisi animi assumenda! Accusamus nemo ducimus, nulla explicabo sapiente quas quos modi commodi praesentium exercitationem corrupti officia vel? Iure, voluptates.
        Recusandae repellendus quo fugiat quae obcaecati! Eos mollitia consequuntur aliquid. Praesentium, vero vel rerum possimus nobis soluta, facere odit ab, labore dolorum eligendi voluptas cum. Perspiciatis ducimus quaerat totam voluptas?
        Ullam, doloribus? Adipisci exercitationem numquam perferendis veritatis dolorem necessitatibus vitae facilis eum doloremque aspernatur, officiis labore dolorum optio? Repellendus, omnis officia ratione exercitationem unde sint ab odit possimus impedit culpa?
        Porro nisi sit earum facilis ex? Nobis, repellat soluta. Itaque exercitationem, quam harum veritatis labore consectetur autem. Ad quibusdam consequuntur fugit, adipisci cum non earum et illum, exercitationem est blanditiis!
        Assumenda, quae, amet molestiae deserunt maxime eum aspernatur, eligendi non nam officiis eos iure debitis natus unde. Officiis voluptatum accusantium expedita modi? Architecto quod voluptates dolore, cumque modi est nostrum!
        Blanditiis ex earum error voluptas architecto dolorum labore cumque fugit, eius eos qui voluptatum totam provident aspernatur ipsa sunt odio dolore tenetur dicta suscipit quo iste! Ipsum dignissimos omnis assumenda?
        Fugit ex, ea, rerum, modi accusantium aut quasi saepe odio dicta pariatur inventore neque unde consectetur laboriosam perferendis dolores blanditiis aspernatur magnam. Velit sapiente exercitationem aperiam! Placeat odit maxime quas?
        Corporis explicabo nobis corrupti repellendus. Voluptates doloremque animi nemo, sint ipsum ut itaque error. Exercitationem cupiditate temporibus beatae, nisi in ratione unde magni non fugit, autem fugiat debitis, ad pariatur.
        Libero, minus dolorum. Vero omnis quas tempora dicta, magni magnam doloribus expedita sed obcaecati minima, dignissimos fugit earum dolorem nam reiciendis a officiis architecto quos sit exercitationem voluptas! Blanditiis, qui!
        Ab quisquam nulla aut. Voluptatibus laudantium necessitatibus recusandae asperiores maiores. Aut perspiciatis nisi quis ducimus libero aliquam adipisci est minus? Nam at ad, vitae mollitia fuga eveniet repellendus quibusdam consectetur?
        Minima pariatur minus beatae exercitationem error sint doloremque iusto, cum, reiciendis eos ad, odit ipsam! Deleniti libero voluptatum expedita. Totam, velit debitis autem rerum exercitationem vel reiciendis illum officia architecto.
        <Modal
          {...args}
          key="dynamic-modal"
          isOpen={isOpen}
          onClose={() => handleClose(false)}
        >
          <Modal.Content heading="Modal title">
            <Tabs defaultValue="1" listGap={16}>
              <Tabs.Panel value="1" label="Tab 1">
                <Stack vPadding={24} hPadding={24}>
                  ciao
                  <button type="button">Test focus</button>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="2" label="Tab mid long 2">
                <Stack vPadding={24} hPadding={24}>
                  ciao
                  <button type="button">Test focus</button>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Modal.Content>
        </Modal>
      </>
    );
  },
} satisfies Story;
