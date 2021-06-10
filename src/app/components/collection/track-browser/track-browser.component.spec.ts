import { Observable, Subject } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';
import { Track } from '../../../common/data/entities/track';
import { Logger } from '../../../common/logger';
import { MouseSelectionWatcher } from '../../../common/mouse-selection-watcher';
import { BasePlaybackIndicationService } from '../../../services/playback-indication/base-playback-indication.service';
import { BasePlaybackService } from '../../../services/playback/base-playback.service';
import { PlaybackStarted } from '../../../services/playback/playback-started';
import { TrackModel } from '../../../services/track/track-model';
import { TrackModels } from '../../../services/track/track-models';
import { BaseTranslatorService } from '../../../services/translator/base-translator.service';
import { BaseTracksPersister } from '../base-tracks-persister';
import { TrackOrder } from '../track-order';
import { TrackBrowserComponent } from './track-browser.component';

describe('TrackBrowserComponent', () => {
    let playbackServiceMock: IMock<BasePlaybackService>;
    let playbackIndicationServiceMock: IMock<BasePlaybackIndicationService>;
    let mouseSelectionWatcherMock: IMock<MouseSelectionWatcher>;
    let loggerMock: IMock<Logger>;
    let translatorServiceMock: IMock<BaseTranslatorService>;
    let tracksPersisterMock: IMock<BaseTracksPersister>;
    let playbackStartedMock: Subject<PlaybackStarted>;
    let playbackStartedMock$: Observable<PlaybackStarted>;

    let track1: Track;
    let track2: Track;
    let trackModel1: TrackModel;
    let trackModel2: TrackModel;
    let tracks: TrackModels;

    let component: TrackBrowserComponent;

    beforeEach(() => {
        playbackServiceMock = Mock.ofType<BasePlaybackService>();
        playbackIndicationServiceMock = Mock.ofType<BasePlaybackIndicationService>();
        mouseSelectionWatcherMock = Mock.ofType<MouseSelectionWatcher>();
        loggerMock = Mock.ofType<Logger>();
        translatorServiceMock = Mock.ofType<BaseTranslatorService>();
        tracksPersisterMock = Mock.ofType<BaseTracksPersister>();
        playbackStartedMock = new Subject();
        playbackStartedMock$ = playbackStartedMock.asObservable();
        playbackServiceMock.setup((x) => x.playbackStarted$).returns(() => playbackStartedMock$);
        tracksPersisterMock.setup((x) => x.getSelectedTrackOrder()).returns(() => TrackOrder.byTrackTitleDescending);
        track1 = new Track('Path1');
        track1.trackTitle = 'Title1';
        track2 = new Track('Path2');
        track2.trackTitle = 'Title2';
        trackModel1 = new TrackModel(track1, translatorServiceMock.object);
        trackModel2 = new TrackModel(track2, translatorServiceMock.object);
        tracks = new TrackModels();
        tracks.addTrack(trackModel1);
        tracks.addTrack(trackModel2);

        component = new TrackBrowserComponent(
            playbackServiceMock.object,
            playbackIndicationServiceMock.object,
            mouseSelectionWatcherMock.object,
            loggerMock.object
        );
    });

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act

            // Assert
            expect(component).toBeDefined();
        });

        it('should define trackOrderEnum', () => {
            // Arrange

            // Act

            // Assert
            expect(component.trackOrderEnum).toBeDefined();
        });

        it('should define tracks as empty', () => {
            // Arrange

            // Act

            // Assert
            expect(component.tracks).toBeDefined();
            expect(component.tracks.tracks.length).toEqual(0);
        });

        it('should declare selectedTrackOrder', () => {
            // Arrange

            // Act

            // Assert
            expect(component.selectedTrackOrder).toBeUndefined();
        });

        it('should declare tracksPersister', () => {
            // Arrange

            // Act

            // Assert
            expect(component.tracksPersister).toBeUndefined();
        });
    });

    describe('tracks', () => {
        it('should set and get the tracks', () => {
            // Arrange
            component.selectedTrackOrder = TrackOrder.byTrackTitleDescending;
            component.tracksPersister = tracksPersisterMock.object;
            component.ngOnInit();

            // Act
            component.tracks = tracks;

            // Assert
            expect(component.tracks).toBe(tracks);
        });

        it('should initialize mouseSelectionWatcher using tracks', () => {
            // Arrange
            component.selectedTrackOrder = TrackOrder.byTrackTitleDescending;
            component.tracksPersister = tracksPersisterMock.object;
            component.ngOnInit();

            // Act
            component.tracks = tracks;

            // Assert
            // TODO: TypeMoq does not consider the call with track.track to have been performed (The reference to tracks.tracks seems lost).
            // So we use a workaround to ensure that the correct call occurs.
            // mouseSelectionWatcherMock.verify((x) => x.initialize(tracks.tracks, false), Times.exactly(1));
            mouseSelectionWatcherMock.verify(
                (x) =>
                    x.initialize(
                        It.is(
                            (trackModels: TrackModel[]) =>
                                trackModels.length === 2 &&
                                trackModels[0].path === trackModel1.path &&
                                trackModels[1].path === trackModel2.path
                        ),
                        false
                    ),
                Times.exactly(1)
            );
        });

        it('should order the tracks by the selected track order', () => {
            // Arrange
            component.selectedTrackOrder = TrackOrder.byTrackTitleAscending;
            component.tracksPersister = tracksPersisterMock.object;
            component.ngOnInit();

            // Act
            component.tracks = tracks;

            // Assert
            expect(component.orderedTracks[0]).toBe(trackModel2);
            expect(component.orderedTracks[1]).toBe(trackModel1);
        });
    });

    describe('ngOnInit', () => {
        it('should get the selected track order from the persister', () => {
            // TODO
        });
    });
});
