"use client";

import { RefObject, useLayoutEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ResponsiveSettings = {
  minWidth: number;
  cardWidth?: number;
  cardHeight?: number;
  enterX: number | ((width: number) => number);
  leaveX: number | ((width: number) => number);
};

export type ScrollStackOptions = {
  /*
   * Какие элементы считать карточками.
   *
   * Например:
   * "[data-scroll-item]"
   *
   * или:
   * ".project-card"
   */
  itemSelector?: string;

  /*
   * Необязательный элемент внутри карточки,
   * который тоже будет анимироваться.
   *
   * Например:
   * "[data-scroll-number]"
   */
  decorationSelector?: string;

  /*
   * Скорость scrub.
   */
  scrub?: number;

  /*
   * Сколько px scroll нужно на одну карточку.
   */
  scrollPerItem?: number;

  /*
   * Сколько карточек должно быть в анимации.
   */
  itemCount?: number;

  /*
   * Начальный scale для следующих карточек.
   */
  initialScale?: number;

  /*
   * Начальная opacity следующих карточек.
   */
  initialOpacity?: number;

  /*
   * Scale предыдущей карточки после ухода.
   */
  leavingScale?: number;

  /*
   * Opacity предыдущей карточки после ухода.
   */
  leavingOpacity?: number;

  /*
   * Если true — секция фиксируется через pin.
   */
  pin?: boolean;

  /*
   * На сколько уезжает дополнительный элемент
   * внутри карточки.
   */
  decorationLeaveX?: number;

  /*
   * Desktop / tablet / mobile.
   */
  responsive?: {
    desktop?: ResponsiveSettings;
    tablet?: ResponsiveSettings;
    mobile?: ResponsiveSettings;
  };
};

const getValue = (
  value: number | ((width: number) => number),
  width: number,
) => {
  return typeof value === "function" ? value(width) : value;
};

export function useScrollStack(
  containerRef: RefObject<HTMLElement | null>,
  options: ScrollStackOptions = {},
) {
  const {
    itemSelector = "[data-scroll-item]",
    decorationSelector = "[data-scroll-decoration]",

    scrub = 1,
    scrollPerItem = 900,

    initialScale = 0.78,
    initialOpacity = 0.3,

    leavingScale = 0.78,
    leavingOpacity = 0.25,

    pin = true,

    decorationLeaveX = -80,

    responsive = {
      desktop: {
        minWidth: 1024,
        cardWidth: 520,
        cardHeight: 680,
        enterX: 700,
        leaveX: -420,
      },

      tablet: {
        minWidth: 768,
        cardWidth: 430,
        cardHeight: 600,
        enterX: 550,
        leaveX: -350,
      },

      mobile: {
        minWidth: 0,
        cardWidth: (width) => Math.min(width * 0.76, 330),
        cardHeight: (width) => Math.min(window.innerHeight * 0.68, 540),
        enterX: (width) => width * 0.72,
        leaveX: (width) => -width * 0.58,
      },
    },
  } = options;

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(itemSelector);

      if (items.length < 2) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },

        (context) => {
          const conditions = context.conditions;

          let settings = responsive.desktop;

          if (conditions?.tablet) {
            settings = responsive.tablet ?? responsive.desktop;
          }

          if (conditions?.mobile) {
            settings =
              responsive.mobile ?? responsive.tablet ?? responsive.desktop;
          }

          if (!settings) {
            return;
          }

          const width = window.innerWidth;

          const cardWidth = settings.cardWidth
            ? getValue(settings.cardWidth, width)
            : undefined;

          const cardHeight = settings.cardHeight
            ? getValue(settings.cardHeight, width)
            : undefined;

          const enterX = getValue(settings.enterX, width);

          const leaveX = getValue(settings.leaveX, width);

          /*
           * Карточки автоматически
           * становятся абсолютными.
           */
          gsap.set(items, {
            position: "absolute",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
          });

          /*
           * Размеры карточек,
           * если они переданы.
           */
          if (cardWidth !== undefined || cardHeight !== undefined) {
            gsap.set(items, {
              ...(cardWidth !== undefined ? { width: cardWidth } : {}),

              ...(cardHeight !== undefined ? { height: cardHeight } : {}),
            });
          }

          /*
           * Начальное состояние.
           */
          items.forEach((item, index) => {
            gsap.set(item, {
              x: index === 0 ? 0 : enterX + index * 35,

              scale: index === 0 ? 1 : initialScale,

              opacity: index === 0 ? 1 : initialOpacity,

              zIndex: 100 - index,
            });
          });

          /*
           * Timeline.
           */
          const timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: container,

              start: "top top",

              end: `+=${(items.length - 1) * scrollPerItem}`,

              pin,

              scrub,

              anticipatePin: 1,

              invalidateOnRefresh: true,
            },
          });

          /*
           * Переключаем карточки
           * одну за другой.
           */
          for (let index = 1; index < items.length; index++) {
            const previous = items[index - 1];

            const current = items[index];

            const previousDecoration =
              previous.querySelector<HTMLElement>(decorationSelector);

            const currentDecoration =
              current.querySelector<HTMLElement>(decorationSelector);

            /*
             * Предыдущая карточка
             * уезжает влево.
             */
            timeline.to(
              previous,
              {
                x: leaveX,
                scale: leavingScale,
                opacity: leavingOpacity,
                duration: 1,
              },
              index - 1,
            );

            /*
             * Новая карточка
             * становится главной.
             */
            timeline.to(
              current,
              {
                x: 0,
                scale: 1,
                opacity: 1,
                zIndex: 100 + index,
                duration: 1,
              },
              index - 1,
            );

            /*
             * Необязательная
             * декоративная часть.
             */
            if (previousDecoration) {
              timeline.to(
                previousDecoration,
                {
                  x: decorationLeaveX,
                  opacity: 0.1,
                  scale: 0.8,
                  duration: 1,
                },
                index - 1,
              );
            }

            if (currentDecoration) {
              timeline.to(
                currentDecoration,
                {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 1,
                },
                index - 1,
              );
            }
          }

          /*
           * Cleanup для текущего media query.
           */
          return () => {
            timeline.kill();
          };
        },
      );

      return () => {
        media.revert();
      };
    }, container);

    /*
     * Полный cleanup.
     */
    return () => {
      ctx.revert();
    };
  }, [
    containerRef,

    itemSelector,
    decorationSelector,

    scrub,
    scrollPerItem,

    initialScale,
    initialOpacity,

    leavingScale,
    leavingOpacity,

    pin,

    decorationLeaveX,

    responsive,
  ]);
}
