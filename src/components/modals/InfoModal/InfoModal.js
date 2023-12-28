import React from "react";
import { MAX_MISTAKES } from "../../../lib/constants";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import BaseModal from "../BaseModal";

function InfoModal() {
  return (
    <BaseModal
      title=""
      trigger={<Info className="mr-4" />}
      initiallyOpen={false}
      actionButtonText="Entendi!"
    >
      <Tabs defaultValue="how-to-play">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="how-to-play">Como Jogar</TabsTrigger>
          <TabsTrigger value="about-us">Sobre</TabsTrigger>
        </TabsList>
        <TabsContent value="how-to-play">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Qual o Objetivo?</AccordionTrigger>
              <AccordionContent>
                Encontre grupos de itens ou nomes que possuam algo em comum.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Como Jogar?</AccordionTrigger>
              <AccordionContent>
                Selecione os itens e clique em 'Enviar' para verificar se seu palpite
                corresponde a uma das categorias de resposta.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Quantas Vezes Eu Posso Tentar?</AccordionTrigger>
              <AccordionContent>
                {`Você pode cometer ${MAX_MISTAKES} erros antes que o jogo termine.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="about-us">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who Are Y'all?</AccordionTrigger>
              <AccordionContent>
                This project is brought to you by andcomputers, feel free to
                subscribe to our writing and other experiments.{" "}
                <a
                  href="https://andcomputers.io/"
                  target="_blank"
                  className="underline font-bold"
                >
                  Check out our writing here.
                </a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How Can I Support?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-1">If you'd like to support feel free!</p>
                <ul className="list-disc">
                  <li>
                    <p>Help us make an upcoming puzzle by </p>
                    <a
                      href="mailto:jcp@mail.andcomputers.io"
                      target="_blank"
                      className="underline font-bold"
                    >
                      emailing the team.
                    </a>
                  </li>
                  <li>
                    <p className="mt-2 mb-1">Help us pay for servers & time:</p>
                    <ul>
                      <li>
                        {" "}
                        - One-time contribution via{" "}
                        <a
                          href="https://buy.stripe.com/7sIg1Udac6xZegodQR"
                          target="_blank"
                          className="underline font-bold"
                        >
                          Stripe.
                        </a>
                      </li>
                      <li>
                        {" "}
                        - Recurring contributions via{" "}
                        <a
                          href="https://www.patreon.com/andcomputers"
                          target="_blank"
                          className="underline font-bold"
                        >
                          Patreon.
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Any Other Projects to Check Out?
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-flow-row">
                  <p>Just a few! </p>
                  <a
                    href="https://andcomputers.io/"
                    target="_blank"
                    className="underline font-bold"
                  >
                    - Our writing and thoughts are here.
                  </a>
                  <a
                    href="https://blacktwitter.io/"
                    target="_blank"
                    className="underline font-bold"
                  >
                    - BlackTwitter
                  </a>
                  <a
                    href="https://blackwords.andcomputers.io/"
                    target="_blank"
                    className="underline font-bold"
                  >
                    - Black Wordle
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

export default InfoModal;
