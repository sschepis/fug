
import { expect } from "chai";
import { Fug } from "../src/index";

describe("Fug", () => {
  describe("parse", () => {
    it("should parse a simple element", () => {
      const code = "div";
      const expected = [
        {
          name: "div",
          attributes: {},
          children: [],
        },
      ];
      expect(Fug.parse(code)).to.deep.equal(expected);
    });

    it("should parse an element with attributes", () => {
      const code = "div(id=foo, class=bar)";
      const expected = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [],
        },
      ];
      expect(Fug.parse(code)).to.deep.equal(expected);
    });

    it("should parse an element with children", () => {
      const code = "div(h1)";
      const expected = [
        {
          name: "div",
          attributes: {},
          children: [
            {
              name: "h1",
              attributes: {},
              children: [],
            },
          ],
        },
      ];
      expect(Fug.parse(code)).to.deep.equal(expected);
    });

    it("should parse an element with attributes and children", () => {
      const code = "div(id=foo, class=bar)(h1)";
      const expected = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [
            {
              name: "h1",
              attributes: {},
              children: [],
            },
          ],
        },
      ];
      expect(Fug.parse(code)).to.deep.equal(expected);
    });

    it("should parse multiple elements", () => {
      const code = "div(id=foo, class=bar)(h1)div(id=foo2, class=bar2)(h2)";
      const expected = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [
            {
              name: "h1",
              attributes: {},
              children: [],
            },
          ],
        },
        {
          name: "div",
          attributes: {
            id: "foo2",
            class: "bar2",
          },
          children: [
            {
              name: "h2",
              attributes: {},
              children: [],
            },
          ],
        },
      ];
      expect(Fug.parse(code)).to.deep.equal(expected);
    });

    it("should parse nested elements", () => {
      const code = "div(id=foo, class=bar)(h1(id=foo2, class=bar2)(h2))";
      const expected = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [
            {
              name: "h1",
              attributes: {
                id: "foo2",
                class: "bar2",
              },
              children: [
                {
                  name: "h2",
                  attributes: {},
                  children: [],
                },
              ],
            },
          ],
        },
      ];
      expect(Fug.parse(code)).to.deep.equal(expected);
    });
  })

  describe("generate", () => {
    it("should generate a simple element", () => {
      const elements: any = [
        {
          name: "div",
          attributes: {},
          children: [],
        },
      ];
      const expected = "<div></div>";
      expect(Fug.generateElement(elements)).to.equal(expected);
    });

    it("should generate an element with attributes", () => {
      const elements: any = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [],
        },
      ];
      const expected = '<div id="foo" class="bar"></div>';
      expect(Fug.generateElement(elements)).to.equal(expected);
    });

    it("should generate an element with children", () => {
      const elements: any = [
        {
          name: "div",
          attributes: {},
          children: [
            {
              name: "h1",
              attributes: {},
              children: [],
            },
          ],
        },
      ];
      const expected = "<div><h1></h1></div>";
      expect(Fug.generateElement(elements)).to.equal(expected);
    });

    it("should generate an element with attributes and children", () => {
      const elements: any = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [
            {
              name: "h1",
              attributes: {},
              children: [],
            },
          ],
        },
      ];
      const expected = '<div id="foo" class="bar"><h1></h1></div>';
      expect(Fug.generateElement(elements)).to.equal(expected);
    });

    it("should generate multiple elements", () => {
      const elements: any = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [
            {
              name: "h1",
              attributes: {},
              children: [],
            },
          ],
        },
        {
          name: "div",
          attributes: {
            id: "foo2",
            class: "bar2",
          },
          children: [
            {
              name: "h2",
              attributes: {},
              children: [],
            },
          ],
        },
      ];
      const expected = '<div id="foo" class="bar"><h1></h1></div><div id="foo2" class="bar2"><h2></h2></div>';
      expect(Fug.generateElement(elements)).to.equal(expected);
    });

    it("should generate nested elements", () => {
      const elements: any = [
        {
          name: "div",
          attributes: {
            id: "foo",
            class: "bar",
          },
          children: [
            {
              name: "h1",
              attributes: {
                id: "foo2",
                class: "bar2",
              },
              children: [
                {
                  name: "h2",
                  attributes: {},
                  children: [],
                },
              ],
            },
          ],
        },
      ];
      const expected = '<div id="foo" class="bar"><h1 id="foo2" class="bar2"><h2></h2></h1></div>';
      expect(Fug.generateElement(elements)).to.equal(expected);
    });
  })
});