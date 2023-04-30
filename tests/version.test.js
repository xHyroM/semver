import test from "ava";
import {
  equal,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  parse,
} from "../dist/index.js";

test("parse", (t) => {
  t.deepEqual(parse("1.2.3"), {
    major: 1,
    minor: 2,
    patch: 3,
    tag: null,
    metadata: null,
  });

  t.deepEqual(parse("1.2.3-alpha"), {
    major: 1,
    minor: 2,
    patch: 3,
    tag: "alpha",
    metadata: null,
  });

  t.deepEqual(parse("1.2.3-alpha+1"), {
    major: 1,
    minor: 2,
    patch: 3,
    tag: "alpha",
    metadata: "1",
  });
});

test("equals", (t) => {
  t.true(equal("1.2.3", "1.2.3"));
});

test("less than", (t) => {
  t.true(lessThan("1.2.3", "2.0.0"));
  t.true(lessThan("1.2.3", "1.2.4"));
  t.true(lessThan("1.2.3", "1.3.0"));
  t.true(lessThan("1.2.3", "2.0.0"));
  t.false(lessThan("1.2.3", "1.2.3"));
  t.false(lessThan("1.2.3", "1.2.2"));
});

test("greater than", (t) => {
  t.true(greaterThan("1.2.4", "1.2.3"));
  t.true(greaterThan("1.3.0", "1.2.3"));
  t.true(greaterThan("2.0.0", "1.2.3"));
  t.false(greaterThan("1.2.2", "1.2.3"));
  t.false(greaterThan("1.2.3", "1.2.3"));
});

test("less than or equal", (t) => {
  t.true(lessThanOrEqual("1.2.3", "1.2.4"));
  t.true(lessThanOrEqual("1.2.3", "1.3.0"));
  t.true(lessThanOrEqual("1.2.3", "2.0.0"));
  t.true(lessThanOrEqual("1.2.3", "1.2.3"));
  t.false(lessThanOrEqual("1.2.3", "1.2.2"));
});

test("greater than or equal", (t) => {
  t.true(greaterThanOrEqual("1.2.4", "1.2.3"));
  t.true(greaterThanOrEqual("1.3.0", "1.2.3"));
  t.true(greaterThanOrEqual("2.0.0", "1.2.3"));
  t.true(greaterThanOrEqual("1.2.3", "1.2.3"));
  t.false(greaterThanOrEqual("1.2.2", "1.2.3"));
});
