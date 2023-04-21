import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Title } from '../..';
import { StickySpy } from './sticky-spy';

const story: ComponentMeta<typeof StickySpy> = {
  title: 'Widgets/Sticky Spy',
  component: StickySpy,
  args: {},
  argTypes: {
  },
};

export default story;

const Template: ComponentStory<typeof StickySpy> = (args) => {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <div>
      <StickySpy {...args} onStickyChange={sticky => setIsSticky(sticky)}>
        <Title
          level="2"
          style={{ position: 'sticky', top: 0, background: isSticky && 'red' }}
        >
          Sticky title
          {isSticky && 'dio'}
        </Title>
      </StickySpy>
      {/* eslint-disable max-len */}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni modi, aliquid qui repellat ipsum velit accusantium laudantium. Nisi, minus labore eligendi sint autem ipsum, doloribus accusantium vitae, praesentium aspernatur dolorum.
      Aliquid id magnam nisi sunt, aut doloribus. Consectetur vel maiores voluptas corporis pariatur facilis consequuntur eius voluptatem harum debitis animi amet similique, incidunt temporibus tempore cumque praesentium rerum dolorum excepturi?
      Neque repellendus et necessitatibus, corporis eligendi sed omnis aspernatur molestiae. Ratione vero corporis, vel hic amet harum doloribus, omnis ullam tempora et ex sed tempore libero explicabo dicta quisquam deserunt!
      Voluptatibus nostrum ipsam vitae assumenda eius laudantium sapiente, autem tempora libero neque impedit dolorem in enim praesentium, sequi consectetur repellendus nobis totam molestiae quam veritatis? Eum nam modi dolorem. Vero!
      Perferendis exercitationem, veritatis porro ex velit quo dolorum officia, vero neque, eligendi odio quos! Saepe quam animi sit odit, harum repellendus quis fugit sint natus facilis labore. Facilis, a eos?
      Commodi at dolore amet autem rerum unde obcaecati, eligendi voluptas, similique doloremque temporibus facere eveniet dolorem fugiat placeat reprehenderit iusto reiciendis. Rerum facilis maiores eaque accusantium illum aut unde fuga.
      Voluptas dolore commodi distinctio nemo velit. Architecto blanditiis rerum consequatur quod expedita placeat est nostrum ipsam officiis sint, cupiditate veniam, nulla eveniet suscipit culpa perspiciatis itaque corporis, facilis at mollitia.
      Ipsam quaerat odio facere ratione, earum pariatur iusto corporis aspernatur commodi est consequuntur eveniet, aliquid quo modi quas eum cupiditate eligendi voluptatibus perspiciatis rem cumque, reprehenderit placeat unde? Temporibus, voluptatibus.
      Quisquam libero nulla quibusdam aliquam facere id culpa quasi veniam sapiente aut maxime rerum architecto illo quam minima, ducimus, inventore ipsum veritatis reiciendis, voluptatibus tempore. Impedit exercitationem ab totam ipsam?
      Natus quod, optio illo nihil, qui itaque, quibusdam deleniti dignissimos totam sint at! Voluptas rerum minus vel dicta officiis maiores nisi veniam quibusdam mollitia praesentium, quia ullam deleniti dignissimos consequatur?
      Molestiae temporibus autem doloribus, nisi harum unde voluptatibus dolorem eum. Amet aliquid eligendi recusandae debitis modi fuga omnis nemo quidem sed quisquam! Dicta voluptatem eaque tenetur error optio sint nobis?
      Soluta mollitia culpa ullam aliquid repellendus, ab dolorum pariatur impedit dolorem amet, architecto molestiae fugit molestias, esse vero. At reprehenderit consequatur quisquam. Quia maiores, dignissimos accusamus nostrum quibusdam vitae earum?
      Nam, laborum sed quo facere ducimus repellat odio ipsam repellendus natus atque veritatis? Repudiandae inventore eius vero similique alias praesentium, unde eos, molestiae ducimus assumenda consectetur ipsam odit temporibus accusantium.
      Deleniti maxime similique libero, dicta iste dolorum repellendus labore eum, incidunt corporis facere veniam repellat enim provident et officia nostrum. Non incidunt corrupti voluptatem a tempora quibusdam omnis accusantium ipsum.
      Rerum voluptates temporibus aut vel quasi animi reprehenderit nesciunt, expedita impedit commodi natus dolorum aliquid veritatis quibusdam vero molestiae quo ducimus. Omnis corrupti rerum minima harum ex nulla officiis doloremque.
      Corrupti illo non deleniti autem facere, totam numquam doloribus quisquam fuga sed obcaecati, delectus a, quo reiciendis illum. Illo ea quibusdam quo alias accusantium et cum ratione explicabo rem deleniti.
      Aliquid voluptatem voluptatum accusantium nulla, eveniet ipsa consequuntur accusamus cum aliquam porro neque asperiores dolore quia sint dolorem inventore qui ducimus est non beatae reiciendis numquam nobis incidunt. Officia, fuga.
      Quia rem explicabo repudiandae, expedita maiores rerum, sunt ipsam saepe accusantium id aliquid accusamus autem suscipit perferendis natus sint tenetur, nesciunt quaerat soluta. Voluptate architecto repudiandae iusto rerum est repellendus!
      Alias iure laudantium saepe necessitatibus suscipit ratione quis nesciunt, quisquam nostrum corporis fugit sapiente accusamus corrupti explicabo? Maiores, tempora accusantium fugiat odio tenetur reiciendis culpa facilis, animi accusamus esse totam?
      Quod, nesciunt, iusto voluptate quam impedit, aliquam dolore deserunt eligendi consectetur facere modi numquam provident tenetur animi totam ab quasi cupiditate iste ea voluptatum sit voluptas tempore. Inventore, rerum id?
      In enim repellendus quisquam debitis, labore dignissimos qui blanditiis modi cumque molestias exercitationem et vel sint, aliquid cum dolore officiis molestiae tenetur ducimus voluptatum unde ipsa, quod nisi? Consequatur, veritatis?
      Voluptatum dignissimos maiores debitis ullam, incidunt ea assumenda consequuntur facere perferendis officiis iusto quam modi quia ex nemo at? Nostrum in ex, repellat placeat vitae sunt temporibus maxime autem odio.
      Mollitia, nam earum, quae, assumenda maiores aliquam quasi in dolores possimus neque dolore totam iure. Non maxime quam libero, quia cupiditate vero eveniet exercitationem quos necessitatibus sapiente cumque hic enim.
      Esse possimus et incidunt dolore, dignissimos laborum adipisci exercitationem sapiente voluptatibus consequatur ratione ipsa blanditiis rem voluptates harum similique sequi mollitia fugit repellat ex, aspernatur, deleniti reiciendis optio id. Iusto.
      Quis ab perspiciatis ipsum temporibus reiciendis illo sequi quae sapiente dignissimos, magnam mollitia eum dolore blanditiis, ex exercitationem optio possimus aliquam! Veniam rem laudantium ex soluta repellendus dolorem eos esse.
      Voluptatem accusamus consectetur praesentium nisi. Animi eaque corporis iure omnis! Qui tenetur nam error, dolorem sequi officiis deleniti. At minus voluptatem distinctio enim tempore harum necessitatibus! Libero quod doloribus natus!
      Vitae dolor reiciendis quaerat sequi, reprehenderit fugit repudiandae nesciunt necessitatibus facere quo, unde dicta totam accusantium quibusdam, mollitia magni deleniti architecto rem a perferendis omnis corrupti sunt? Nulla, assumenda laudantium!
      Doloremque, quis quia. Quibusdam, perspiciatis eos molestiae saepe iure impedit tempora, odit rerum cupiditate et commodi. Incidunt nemo sunt tenetur possimus est nam, illo odio nisi officia in nihil ducimus!
      Corrupti dolorem laboriosam laborum porro temporibus accusantium sapiente harum totam amet ab? Sit accusamus, velit facilis voluptatibus consequatur aspernatur itaque voluptate nisi non commodi, labore vel! Aut error magnam qui!
      Veniam amet ullam perferendis aperiam debitis laudantium dolore, porro fugiat nesciunt omnis corporis a, inventore quas, sit reiciendis enim quod odio aliquid voluptas. Ut veritatis quo fuga debitis velit at!
      Temporibus nesciunt explicabo, consequatur dolor aut maiores ut error reiciendis perferendis non cumque doloribus rem, quas laudantium molestiae, voluptas placeat atque quia in illo nihil voluptatum? Soluta quibusdam quis tempore.
      Earum qui, at pariatur sunt est modi. Itaque quia exercitationem saepe eveniet, ut odio eaque ipsa omnis perferendis totam accusamus nemo ea quis ex doloremque voluptatum iure, sed quos modi?
      Tempore consequuntur illum mollitia dignissimos voluptatem labore vero eos quo id quaerat esse tempora perspiciatis magnam commodi aperiam accusantium natus sequi sint ratione, fuga eius ullam nulla excepturi debitis? Possimus?
      Tempora, quasi voluptatibus, modi architecto quidem repellendus dolorem ab non officiis vero cupiditate doloribus, aperiam consectetur. Ex placeat, laborum debitis quos dolore officiis dolorem, omnis, fuga pariatur asperiores esse cupiditate!
      Placeat eos velit rerum vero tempore accusamus maxime totam consequuntur amet maiores aspernatur impedit expedita cumque earum architecto dolor, molestias corporis accusantium? Numquam nam ipsum sed nesciunt labore rerum repellat.
      Adipisci odio praesentium vitae iusto facere, atque eum eveniet at et repellendus, dicta maiores officia eligendi vero quasi dolore ut exercitationem tempore quidem totam explicabo voluptate harum autem minus! Illum.
      Ut natus quod deserunt. Officia debitis provident minima delectus minus unde, quis inventore hic rem itaque accusamus perspiciatis animi veniam quia ut repellendus praesentium voluptas, fugiat id omnis officiis nesciunt.
      Consectetur quia dicta dolorem inventore aperiam, voluptate ut consequuntur eius aliquid quaerat nobis eos, eveniet, nesciunt error! Sed sequi unde delectus eaque possimus quos doloribus esse aspernatur. Odit, voluptates velit.
      Cum consequuntur perspiciatis repellat, nihil totam eaque deserunt est tempore, blanditiis, deleniti quae ut molestiae ipsa officia dolorem sint aliquam quasi ea nulla voluptates. Soluta nobis modi pariatur labore accusamus?
      Minus consectetur molestias distinctio blanditiis. Mollitia, provident numquam quae similique assumenda dolorum, esse repudiandae temporibus consequuntur molestiae voluptatibus officiis modi accusantium eveniet impedit cum iusto dicta ad ducimus porro saepe.
      Mollitia, ad. Molestiae voluptatibus libero autem voluptates assumenda labore! Minima repellendus, provident totam animi veritatis eaque ea facere aspernatur a assumenda itaque ratione dolores corrupti est fuga architecto delectus omnis.
      Quidem, dolorem ab. Tempore saepe voluptatum quasi mollitia est amet vitae rerum praesentium veniam nostrum nulla temporibus aperiam error id corporis ipsam at numquam asperiores minima, culpa quos rem quas!
      Suscipit earum, culpa laboriosam tempora, eligendi quisquam ex ipsa nemo cupiditate deserunt totam modi saepe ad molestias ab. Molestiae quas ratione impedit quibusdam explicabo laborum porro, ipsum suscipit aliquid neque?
      Vitae a deserunt iure velit nesciunt earum numquam repellendus necessitatibus eaque. Temporibus pariatur excepturi, explicabo tempora laborum ad earum. Cum, nemo. Magnam tenetur nulla numquam rerum provident esse nihil facilis.
      Nam doloribus debitis facilis voluptatem. Eum, veritatis. Quaerat pariatur error alias fugit provident? Ex quam repudiandae error ipsam, similique in voluptatum, maiores qui libero minus amet, assumenda earum illum. Earum.
      Fugiat assumenda, autem voluptatum cum illum minima amet eaque aperiam neque obcaecati odit repudiandae quas velit quasi et incidunt nostrum fugit fuga unde ut quo laboriosam omnis. Praesentium, ducimus vitae.
      Ducimus nemo, minima ea quidem placeat dolorem sequi iusto accusamus consequuntur aliquid neque, itaque, fugit eos! Libero vitae ex consectetur molestias maiores deserunt velit. Soluta, aliquid! Quaerat minima illum tempora?
      Porro modi rerum numquam asperiores facere perferendis voluptatibus tempore, vel sapiente? Asperiores tempora nulla minus fugiat vero eaque sed ea, illum doloribus itaque dolore et? Quisquam nisi iure excepturi harum.
      A veritatis dolore placeat aperiam maiores minus at et illo ut sed iure distinctio eveniet impedit numquam ea, porro saepe dignissimos, rerum quam quasi enim! Mollitia quaerat sit accusantium asperiores.
      Aperiam doloribus autem optio sapiente saepe quibusdam! Blanditiis similique mollitia optio dignissimos fugiat consequuntur at dicta minus, suscipit nam tempore excepturi neque eveniet delectus ratione, sapiente pariatur veniam dolorum vel!
    </div>
  );
};

export const Default = Template.bind({});
