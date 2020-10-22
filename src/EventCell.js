import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import * as dates from './utils/dates'

export default function EventCell(props) {
  const {
    style,
    className,
    event,
    selected,
    isAllDay,
    onSelect,
    onDoubleClick,
    onKeyPress,
    localizer,
    continuesPrior,
    continuesAfter,
    accessors,
    getters,
    children,
    components: { event: Event, eventWrapper: EventWrapper },
    slotStart,
    slotEnd,
    ...rest
  } = props

  const title = accessors.title(event)
  const tooltip = accessors.tooltip(event)
  const end = accessors.end(event)
  const start = accessors.start(event)
  const allDay = accessors.allDay(event)

  const showAsAllDay = React.useMemo(
    () =>
      isAllDay ||
      allDay ||
      dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
    [isAllDay, allDay, start, end]
  )

  const userProps = getters.eventProp(event, start, end, selected)

  const content = (
    <div className="rbc-event-content" title={tooltip || undefined}>
      {Event ? (
        <Event
          event={event}
          continuesPrior={continuesPrior}
          continuesAfter={continuesAfter}
          title={title}
          isAllDay={allDay}
          localizer={localizer}
          slotStart={slotStart}
          slotEnd={slotEnd}
        />
      ) : (
        title
      )}
    </div>
  )

  return (
    <EventWrapper {...props} type="date">
      <div
        {...rest}
        tabIndex={0}
        style={{ ...userProps.style, ...style }}
        className={clsx('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-allday': showAsAllDay,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter,
        })}
        onClick={(e) => onSelect && onSelect(event, e)}
        onDoubleClick={(e) => onDoubleClick && onDoubleClick(event, e)}
        onKeyPress={(e) => onKeyPress && onKeyPress(event, e)}
      >
        {typeof children === 'function' ? children(content) : content}
      </div>
    </EventWrapper>
  )
}

EventCell.propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  isAllDay: PropTypes.bool,
  continuesPrior: PropTypes.bool,
  continuesAfter: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object,

  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
}
