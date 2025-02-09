import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel } from "../../utils/label";
import { TEXT } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";

@Component({
  tag: "calcite-rating",
  styleUrl: "calcite-rating.scss",
  shadow: true
})
export class CalciteRating implements LabelableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteRatingElement;

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** specify the scale of the component, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** the value of the rating component */
  @Prop({ reflect: true, mutable: true }) value = 0;

  /** is the rating component in a selectable mode */
  @Prop({ reflect: true }) readOnly = false;

  /** is the rating component in a selectable mode */
  @Prop({ reflect: true }) disabled = false;

  /** Show average and count data summary chip (if available) */
  @Prop({ reflect: true }) showChip = false;

  /** optionally pass a number of previous ratings to display */
  @Prop({ reflect: true }) count?: number;

  /** optionally pass a cumulative average rating to display */
  @Prop({ reflect: true }) average?: number;

  /** Localized string for "Rating" (used for aria label)
   * @default "Rating"
   */
  @Prop() intlRating?: string = TEXT.rating;

  /** Localized string for labelling each star, `${num}` in the string will be replaced by the number
   * @default "Stars: ${num}"
   */
  @Prop() intlStars?: string = TEXT.stars;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the rating value has changed.
   */
  @Event() calciteRatingChange: EventEmitter<{ value: number }>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("blur") blurHandler(): void {
    this.hasFocus = false;
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderStars(): VNode[] {
    return [1, 2, 3, 4, 5].map((i) => {
      const selected = this.value >= i;
      const average = this.average && !this.value && i <= this.average;
      const hovered = i <= this.hoverValue;
      const fraction = this.average && this.average + 1 - i;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const focused = this.hasFocus && this.focusValue === i;
      return (
        <span class={{ wrapper: true }}>
          <label
            class={{ star: true, focused, selected, average, hovered, partial }}
            htmlFor={`${this.guid}-${i}`}
            onMouseOver={() => {
              this.hoverValue = i;
            }}
          >
            <calcite-icon
              aria-hidden="true"
              class="icon"
              icon={selected || average || this.readOnly ? "star-f" : "star"}
              scale={this.scale}
            />
            {partial && (
              <div class="fraction" style={{ width: `${fraction * 100}%` }}>
                <calcite-icon icon="star-f" scale={this.scale} />
              </div>
            )}
            <span class="visually-hidden">{this.intlStars.replace("${num}", `${i}`)}</span>
          </label>
          <input
            checked={i === this.value}
            class="visually-hidden"
            disabled={this.disabled || this.readOnly}
            id={`${this.guid}-${i}`}
            name={this.guid}
            onChange={() => this.updateValue(i)}
            onFocus={() => {
              this.hasFocus = true;
              this.focusValue = i;
            }}
            ref={(el) =>
              (i === 1 || i === this.value) && (this.inputFocusRef = el as HTMLInputElement)
            }
            type="radio"
            value={i}
          />
        </span>
      );
    });
  }

  render() {
    const { intlRating, showChip, scale, count, average } = this;
    const dir = getElementDir(this.el);
    return (
      <Fragment>
        <fieldset
          class={{ fieldset: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
          onBlur={() => (this.hoverValue = null)}
          onMouseLeave={() => (this.hoverValue = null)}
          onTouchEnd={() => (this.hoverValue = null)}
        >
          <legend class="visually-hidden">{intlRating}</legend>
          {this.renderStars()}
        </fieldset>
        {(count || average) && showChip ? (
          <calcite-chip
            class={{ [CSS_UTILITY.rtl]: dir === "rtl" }}
            dir={dir}
            scale={scale}
            value={count?.toString()}
          >
            {!!average && <span class="number--average">{average.toString()}</span>}
            {!!count && <span class="number--count">({count?.toString()})</span>}
          </calcite-chip>
        ) : null}
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick = (): void => {
    this.setFocus();
  };

  private updateValue(value: number) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.inputFocusRef.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private State / Properties
  //
  // --------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  private guid = `calcite-ratings-${guid()}`;

  private inputFocusRef: HTMLInputElement;
}
