import { IMock, Mock, Times } from 'typemoq';
import { SearchBoxComponent } from './search-box.component';
import { SearchServiceBase } from '../../../services/search/search.service.base';

describe('SearchBoxComponent', () => {
    let searchServiceMock: IMock<SearchServiceBase>;
    let component: SearchBoxComponent;

    beforeEach(() => {
        searchServiceMock = Mock.ofType<SearchServiceBase>();
        component = new SearchBoxComponent(searchServiceMock.object);
    });

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act

            // Assert
            expect(component).toBeDefined();
        });

        it('should define searchService', () => {
            // Arrange

            // Act

            // Assert
            expect(component.searchService).toBeDefined();
        });
    });

    describe('onBlur', () => {
        it('should stop searching', () => {
            // Arrange

            // Act
            component.onBlur();

            // Assert
            searchServiceMock.verify((x) => x.stopSearching(), Times.once());
        });
    });

    describe('onFocus', () => {
        it('should start searching', () => {
            // Arrange

            // Act
            component.onFocus();

            // Assert
            searchServiceMock.verify((x) => x.startSearching(), Times.once());
        });
    });

    describe('clearSearchText', () => {
        it('should clear the search text', () => {
            // Arrange

            // Act
            component.clearSearchText();

            // Assert
            searchServiceMock.verify((x) => (x.searchText = ''), Times.once());
        });
    });
});
