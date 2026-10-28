$(function () {
  const $tagstring = $("#trace_tagstring");
  const $help = $tagstring.siblings(".form-text");
  const help = $help.text();
  const $tags = $("<ul>")
    .addClass("list-unstyled d-inline-flex flex-wrap column-gap-1 ms-1 mb-0")
    .appendTo($tagstring.parent());

  // Split the tags the same way as Trace#tagstring= does, which
  // only counts ASCII whitespace, unlike \s and trim()
  function tagNames(tagstring) {
    if (tagstring.includes(",")) {
      return tagstring.split(",")
        .map(name => name.replace(/^[\t\n\v\f\r ]+|[\t\n\v\f\r ]+$/g, ""))
        .filter(name => name);
    } else {
      const names = tagstring.split(/[\t\n\v\f\r ]+/).filter(name => name);

      // Nothing to show if the tagstring isn't split at all
      return names.length > 1 ? names : [];
    }
  }

  function updateTags() {
    const tagstring = $tagstring.val();
    const names = tagNames(tagstring);

    if (names.length === 0) {
      $help.text(help);
    } else if (tagstring.includes(",")) {
      $help.text(OSM.i18n.t("javascripts.traces.tagstring.comma_delimited"));
    } else {
      $help.text(OSM.i18n.t("javascripts.traces.tagstring.space_delimited"));
    }

    const items = names
      .map(name => $("<li>").addClass("badge text-bg-secondary mt-1").text(name));
    $tags.empty().append(...items);
  }

  $tagstring.on("input", updateTags);
  updateTags();
});
